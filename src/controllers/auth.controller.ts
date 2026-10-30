import { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { profileUploadsPath } from "../middlewares/uploadProfile.middleware";
import { updatePerfilSchema } from "../schemas/auth.schema";

const seleccionarUsuario = {
  id: true,
  nombre: true,
  apellido: true,
  email: true,
  rol: true,
  telefono: true,
  foto: true,
} as const;

function serializarUsuario(usuario: {
  id: number; nombre: string; apellido: string; email: string; rol: string;
  telefono: string | null; foto: string | null;
}, req: Request) {
  return {
    ...usuario,
    telefono: usuario.telefono ?? undefined,
    foto: usuario.foto ? `${req.protocol}://${req.get("host")}${usuario.foto}` : undefined,
  };
}

export async function register(req: Request, res: Response) {
  try {
    const { nombre, apellido, email, password, rol } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        rol,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        rol: true,
      },
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" },
    );

    res.json({
      token,
      usuario: serializarUsuario(usuario, req),
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
}

export async function me(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: seleccionarUsuario,
    });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.status(200).json({ usuario: serializarUsuario(usuario, req) });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return res.status(500).json({ message: "Error al obtener el perfil" });
  }
}

export async function updatePerfil(req: Request, res: Response) {
  let nuevaFoto: string | undefined;
  let fotoGuardada = false;
  try {
    if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });
    const result = updatePerfilSchema.safeParse(req.body);
    if (!result.success) {
      if (req.file) await fs.unlink(req.file.path).catch(() => undefined);
      return res.status(400).json({ message: "Datos de perfil inválidos", errors: result.error.issues });
    }

    const actual = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: { foto: true },
    });
    if (!actual) {
      if (req.file) await fs.unlink(req.file.path).catch(() => undefined);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.file) nuevaFoto = `/uploads/perfiles/${req.file.filename}`;
    const usuario = await prisma.usuario.update({
      where: { id: req.user.id },
      data: {
        ...result.data,
        ...(nuevaFoto && { foto: nuevaFoto }),
      },
      select: seleccionarUsuario,
    });
    fotoGuardada = true;

    if (nuevaFoto && actual.foto?.startsWith("/uploads/perfiles/")) {
      const nombreAnterior = path.basename(actual.foto);
      await fs.unlink(path.join(profileUploadsPath, nombreAnterior)).catch(() => undefined);
    }
    return res.status(200).json({ usuario: serializarUsuario(usuario, req) });
  } catch (error) {
    if (req.file && !fotoGuardada) await fs.unlink(req.file.path).catch(() => undefined);
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return res.status(409).json({ message: "El correo electrónico ya está registrado" });
    }
    console.error("Error al actualizar perfil:", error);
    return res.status(500).json({ message: "Error al actualizar el perfil" });
  }
}
