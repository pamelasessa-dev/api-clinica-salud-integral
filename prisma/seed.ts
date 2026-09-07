import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma.js";

async function main() {
  console.log("Limpiando datos de prueba...");

  await prisma.cita.deleteMany();
  await prisma.medico.deleteMany();
  await prisma.paciente.deleteMany();
  await prisma.especialidad.deleteMany();
  await prisma.usuario.deleteMany();

  const password = await bcrypt.hash("Test1234!", 10);

  const recepcionista = await prisma.usuario.create({
    data: {
      nombre: "Ana",
      apellido: "Gómez",
      email: "recepcion@test.com",
      password,
      rol: "RECEPCIONISTA",
    },
  });

  const usuarioMedico1 = await prisma.usuario.create({
    data: {
      nombre: "Martín",
      apellido: "Pereira",
      email: "medico1@test.com",
      password,
      rol: "MEDICO",
    },
  });

  const usuarioMedico2 = await prisma.usuario.create({
    data: {
      nombre: "Laura",
      apellido: "Silva",
      email: "medico2@test.com",
      password,
      rol: "MEDICO",
    },
  });

  const medicoSinFicha = await prisma.usuario.create({
    data: {
      nombre: "Diego",
      apellido: "Prueba",
      email: "medico-sin-ficha@test.com",
      password,
      rol: "MEDICO",
    },
  });

  const gerencia = await prisma.usuario.create({
    data: {
      nombre: "Sofía",
      apellido: "Rodríguez",
      email: "gerencia@test.com",
      password,
      rol: "GERENCIA",
    },
  });

  const medicinaGeneral = await prisma.especialidad.create({
    data: { nombre: "Medicina General" },
  });

  const cardiologia = await prisma.especialidad.create({
    data: { nombre: "Cardiología" },
  });

  const pediatria = await prisma.especialidad.create({
    data: { nombre: "Pediatría" },
  });

  const medico1 = await prisma.medico.create({
    data: {
      nombre: "Martín",
      apellido: "Pereira",
      id_especialidad: medicinaGeneral.id_especialidad,
      id_usuario: usuarioMedico1.id,
    },
  });

  const medico2 = await prisma.medico.create({
    data: {
      nombre: "Laura",
      apellido: "Silva",
      id_especialidad: cardiologia.id_especialidad,
      id_usuario: usuarioMedico2.id,
    },
  });

  await prisma.paciente.createMany({
    data: [
      {
        CI: 45678901,
        nombre: "Carlos",
        apellido: "Duarte",
        fecha_nacimiento: new Date("1990-05-15T00:00:00.000Z"),
        direccion: "Av. Italia 1234",
        telefono: "099123456",
        email: "carlos@test.com",
      },
      {
        CI: 48765432,
        nombre: "María",
        apellido: "Fernández",
        fecha_nacimiento: new Date("1985-11-02T00:00:00.000Z"),
        direccion: "Sarandí 456",
        telefono: "098765432",
        email: "maria@test.com",
      },
      {
        CI: 51234567,
        nombre: "Lucía",
        apellido: "Rodríguez",
        fecha_nacimiento: new Date("2001-03-20T00:00:00.000Z"),
        direccion: "Zorrilla 789",
        telefono: "097111222",
        email: "lucia@test.com",
      },
    ],
  });

  // Datos históricos para probar expediente y corte diario del 2026-09-06.
  await prisma.cita.createMany({
    data: [
      {
        fecha_hora: new Date("2026-09-06T10:00:00-03:00"),
        CI_paciente: 45678901,
        id_medico: medico1.id_medico,
        estado: "COMPLETADA",
      },
      {
        fecha_hora: new Date("2026-09-06T11:00:00-03:00"),
        CI_paciente: 48765432,
        id_medico: medico1.id_medico,
        estado: "CANCELADA",
      },
      {
        fecha_hora: new Date("2026-09-06T12:00:00-03:00"),
        CI_paciente: 51234567,
        id_medico: medico2.id_medico,
        estado: "COMPLETADA",
      },

      // Citas futuras para agenda y cambio de estado.
      {
        fecha_hora: new Date("2026-09-08T09:00:00-03:00"),
        CI_paciente: 45678901,
        id_medico: medico1.id_medico,
        estado: "PROGRAMADA",
      },
      {
        fecha_hora: new Date("2026-09-08T10:30:00-03:00"),
        CI_paciente: 48765432,
        id_medico: medico1.id_medico,
        estado: "PROGRAMADA",
      },
      {
        fecha_hora: new Date("2026-09-09T15:00:00-03:00"),
        CI_paciente: 45678901,
        id_medico: medico2.id_medico,
        estado: "PROGRAMADA",
      },
    ],
  });

  console.log("Seed completado.");
  console.log("Password para todos los usuarios: Test1234!");
  console.table([
    { rol: "RECEPCIONISTA", email: recepcionista.email },
    { rol: "MEDICO 1", email: usuarioMedico1.email, idMedico: medico1.id_medico },
    { rol: "MEDICO 2", email: usuarioMedico2.email, idMedico: medico2.id_medico },
    { rol: "MEDICO sin ficha", email: medicoSinFicha.email },
    { rol: "GERENCIA", email: gerencia.email },
  ]);
  console.log("Especialidad extra sin médico:", pediatria.nombre);
}

main()
  .catch((error) => {
    console.error("Error ejecutando seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });