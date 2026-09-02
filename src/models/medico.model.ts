import prisma from "../config/prisma";


// consulta de todos los medicos
export const medicoModel = {
  findAll: async (
    nombre?: string,
    apellido?: string,
    id_especialidad?: number,
  ) => {
    return await prisma.medico.findMany({
      where: {
        // filtros
        ...(nombre && { nombre: { contains: nombre, mode: "insensitive" } }),
        ...(apellido && {
          apellido: { contains: apellido, mode: "insensitive" },
        }),
        ...(id_especialidad && { id_especialidad }),
      },
      orderBy: {
        apellido: "asc",
      },
      select: {
        id_medico: true,
        nombre: true,
        apellido: true,
        especialidad: {
          select: {
            id_especialidad: true,
            nombre: true,
          },
        },
      },
    });
  },
  // consulta de medico por id
  findById: async (id_medico: number) => {
    return await prisma.medico.findUnique({
      where: {
        id_medico,
      },
      select: {
        id_medico: true,
        nombre: true,
        apellido: true,
        especialidad: {
          select: {
            id_especialidad: true,
            nombre: true,
          },
        },
      },
    });
  },
  // creación de un nuevo medico
  create: async (nombre: string, apellido: string, id_especialidad: number) => {
    return await prisma.medico.create({
      data: {
        nombre,
        apellido,
        id_especialidad,
      },
    });
  },
  update: async (
    id_medico: number,
    nombre: string,
    apellido: string,
    id_especialidad: number,
  ) => {
    return await prisma.medico.update({
      where: {
        id_medico,
      },
      data: {
        nombre,
        apellido,
        id_especialidad,
      },
    });
  },
  // eliminación de un medico existente
  delete: async (id_medico: number) => {
    return await prisma.medico.delete({
      where: {
        id_medico,
      },
    });
  },
};
