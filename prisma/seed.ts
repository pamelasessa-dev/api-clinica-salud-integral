import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {

  const nombresEspecialidades = [
    "Cardiología",
    "Pediatría",
    "Dermatología",
    "Psicología",
    "Ginecología",
    "Oftalmología",
    "Odontología",
    "Medicina General",
    "Psiquiatría",
    "Traumatología",
  ];

  const especialidades: Record<string, number> = {};

  for (const nombre of nombresEspecialidades) {
    const especialidad = await prisma.especialidad.upsert({
      where: {
        nombre,
      },
      update: {},
      create: {
        nombre,
      },
    });

    especialidades[nombre] = especialidad.id_especialidad;
  }

  const passwordMedico = await bcrypt.hash("Medico123!", 10);
  const passwordRecepcion = await bcrypt.hash("Recepcion123!", 10);
  const passwordGerencia = await bcrypt.hash("Gerencia123!", 10);

 

  const medicosData = [
    
    {
      nombre: "Lucas",
      apellido: "Barboza",
      email: "lucas.barboza@clinica.com",
      especialidad: "Cardiología",
    },
    {
      nombre: "Ana",
      apellido: "Sabedra",
      email: "ana.sabedra@clinica.com",
      especialidad: "Cardiología",
    },


    {
      nombre: "María",
      apellido: "Santos",
      email: "maria.santos@clinica.com",
      especialidad: "Pediatría",
    },
    {
      nombre: "Estefanía",
      apellido: "Duarte",
      email: "estefania.duarte@clinica.com",
      especialidad: "Pediatría",
    },

   
    {
      nombre: "Favian",
      apellido: "Ramírez",
      email: "favian.ramirez@clinica.com",
      especialidad: "Dermatología",
    },
    {
      nombre: "Alfonso",
      apellido: "Torres",
      email: "alfonso.torres@clinica.com",
      especialidad: "Dermatología",
    },


    {
      nombre: "Sofía",
      apellido: "Fernández",
      email: "sofia.fernandez@clinica.com",
      especialidad: "Psicología",
    },
    {
      nombre: "Martín",
      apellido: "Pereira",
      email: "martin.pereira@clinica.com",
      especialidad: "Psicología",
    },


    {
      nombre: "Laura",
      apellido: "Rodríguez",
      email: "laura.rodriguez@clinica.com",
      especialidad: "Ginecología",
    },
    {
      nombre: "Carolina",
      apellido: "Méndez",
      email: "carolina.mendez@clinica.com",
      especialidad: "Ginecología",
    },


    {
      nombre: "Diego",
      apellido: "Silva",
      email: "diego.silva@clinica.com",
      especialidad: "Oftalmología",
    },
    {
      nombre: "Valentina",
      apellido: "Castro",
      email: "valentina.castro@clinica.com",
      especialidad: "Oftalmología",
    },

   
    {
      nombre: "Javier",
      apellido: "Gómez",
      email: "javier.gomez@clinica.com",
      especialidad: "Odontología",
    },
    {
      nombre: "Camila",
      apellido: "Vázquez",
      email: "camila.vazquez@clinica.com",
      especialidad: "Odontología",
    },

    {
      nombre: "Federico",
      apellido: "López",
      email: "federico.lopez@clinica.com",
      especialidad: "Medicina General",
    },
    {
      nombre: "Paula",
      apellido: "Martínez",
      email: "paula.martinez@clinica.com",
      especialidad: "Medicina General",
    },

   
    {
      nombre: "Sebastián",
      apellido: "Acosta",
      email: "sebastian.acosta@clinica.com",
      especialidad: "Psiquiatría",
    },
    {
      nombre: "Natalia",
      apellido: "Olivera",
      email: "natalia.olivera@clinica.com",
      especialidad: "Psiquiatría",
    },

 
    {
      nombre: "Gonzalo",
      apellido: "Suárez",
      email: "gonzalo.suarez@clinica.com",
      especialidad: "Traumatología",
    },
    {
      nombre: "Florencia",
      apellido: "Cabrera",
      email: "florencia.cabrera@clinica.com",
      especialidad: "Traumatología",
    },
  ];

  const medicos: Record<string, number> = {};

  for (const medicoData of medicosData) {
    // Crear/verificar usuario médico
    const usuario = await prisma.usuario.upsert({
      where: {
        email: medicoData.email,
      },
      update: {
        nombre: medicoData.nombre,
        apellido: medicoData.apellido,
        password: passwordMedico,
        rol: "MEDICO",
      },
      create: {
        nombre: medicoData.nombre,
        apellido: medicoData.apellido,
        email: medicoData.email,
        password: passwordMedico,
        rol: "MEDICO",
      },
    });

    // Crear/verificar médico relacionado con el usuario
    const medico = await prisma.medico.upsert({
      where: {
        id_usuario: usuario.id,
      },
      update: {
        nombre: medicoData.nombre,
        apellido: medicoData.apellido,
        id_especialidad: especialidades[medicoData.especialidad],
      },
      create: {
        nombre: medicoData.nombre,
        apellido: medicoData.apellido,
        id_especialidad: especialidades[medicoData.especialidad],
        id_usuario: usuario.id,
      },
    });

    medicos[medicoData.email] = medico.id_medico;
  }

 

  const recepcionistas = [
    {
      nombre: "Lucía",
      apellido: "González",
      email: "lucia.gonzalez@clinica.com",
    },
    {
      nombre: "Diego",
      apellido: "Morales",
      email: "diego.morales@clinica.com",
    },
  ];

  for (const recepcionista of recepcionistas) {
    await prisma.usuario.upsert({
      where: {
        email: recepcionista.email,
      },
      update: {
        nombre: recepcionista.nombre,
        apellido: recepcionista.apellido,
        password: passwordRecepcion,
        rol: "RECEPCIONISTA",
      },
      create: {
        nombre: recepcionista.nombre,
        apellido: recepcionista.apellido,
        email: recepcionista.email,
        password: passwordRecepcion,
        rol: "RECEPCIONISTA",
      },
    });
  }

  

  await prisma.usuario.upsert({
    where: {
      email: "gerencia@clinica.com",
    },
    update: {
      nombre: "Carlos",
      apellido: "Rodríguez",
      password: passwordGerencia,
      rol: "GERENCIA",
    },
    create: {
      nombre: "Carlos",
      apellido: "Rodríguez",
      email: "gerencia@clinica.com",
      password: passwordGerencia,
      rol: "GERENCIA",
    },
  });



  const pacientes = [
    {
      CI: 51234567,
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan.perez@gmail.com",
      fecha_nacimiento: new Date("1990-05-12T00:00:00-03:00"),
      direccion: "Av. Italia 1234",
      telefono: "099123456",
    },
    {
      CI: 52345678,
      nombre: "María",
      apellido: "García",
      email: "maria.garcia@gmail.com",
      fecha_nacimiento: new Date("1985-08-20T00:00:00-03:00"),
      direccion: "18 de Julio 2456",
      telefono: "098234567",
    },
    {
      CI: 53456789,
      nombre: "Pedro",
      apellido: "Martínez",
      email: "pedro.martinez@gmail.com",
      fecha_nacimiento: new Date("1978-03-15T00:00:00-03:00"),
      direccion: "Rivera 1876",
      telefono: "097345678",
    },
    {
      CI: 54567890,
      nombre: "Laura",
      apellido: "Fernández",
      email: "laura.fernandez@gmail.com",
      fecha_nacimiento: new Date("1995-11-02T00:00:00-03:00"),
      direccion: "Brasil 987",
      telefono: "096456789",
    },
    {
      CI: 55678901,
      nombre: "Andrés",
      apellido: "Rodríguez",
      email: "andres.rodriguez@gmail.com",
      fecha_nacimiento: new Date("1982-01-28T00:00:00-03:00"),
      direccion: "8 de Octubre 1543",
      telefono: "095567890",
    },
    {
      CI: 56789012,
      nombre: "Sofía",
      apellido: "López",
      email: "sofia.lopez@gmail.com",
      fecha_nacimiento: new Date("2001-07-10T00:00:00-03:00"),
      direccion: "Luis Alberto de Herrera 456",
      telefono: "094678901",
    },
    {
      CI: 57890123,
      nombre: "Diego",
      apellido: "Suárez",
      email: "diego.suarez@gmail.com",
      fecha_nacimiento: new Date("1975-12-05T00:00:00-03:00"),
      direccion: "Bulevar Artigas 2234",
      telefono: "093789012",
    },
    {
      CI: 58901234,
      nombre: "Camila",
      apellido: "Méndez",
      email: "camila.mendez@gmail.com",
      fecha_nacimiento: new Date("1998-04-18T00:00:00-03:00"),
      direccion: "General Flores 765",
      telefono: "092890123",
    },
    {
      CI: 59012345,
      nombre: "Martín",
      apellido: "Silva",
      email: "martin.silva@gmail.com",
      fecha_nacimiento: new Date("1988-09-22T00:00:00-03:00"),
      direccion: "Agraciada 1345",
      telefono: "091901234",
    },
    {
      CI: 50123456,
      nombre: "Valentina",
      apellido: "Castro",
      email: "valentina.castro@gmail.com",
      fecha_nacimiento: new Date("2003-02-14T00:00:00-03:00"),
      direccion: "Canelones 678",
      telefono: "090012345",
    },
  ];

  for (const paciente of pacientes) {
    await prisma.paciente.upsert({
      where: {
        CI: paciente.CI,
      },
      update: {
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        email: paciente.email,
        fecha_nacimiento: paciente.fecha_nacimiento,
        direccion: paciente.direccion,
        telefono: paciente.telefono,
      },
      create: paciente,
    });
  }


  const citas = [

    // Citas pasadas completadas
    {
      fecha_hora: new Date("2026-09-03T09:00:00-03:00"),
      CI_paciente: 51234567,
      medicoEmail: "lucas.barboza@clinica.com",
      estado: "COMPLETADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-03T10:00:00-03:00"),
      CI_paciente: 52345678,
      medicoEmail: "maria.santos@clinica.com",
      estado: "COMPLETADA" as const,
    },

    // Cita cancelada

    {
      fecha_hora: new Date("2026-09-04T11:00:00-03:00"),
      CI_paciente: 53456789,
      medicoEmail: "favian.ramirez@clinica.com",
      estado: "CANCELADA" as const,
    },

    // Citas programadas

    {
      fecha_hora: new Date("2026-09-07T09:00:00-03:00"),
      CI_paciente: 54567890,
      medicoEmail: "ana.sabedra@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-07T10:00:00-03:00"),
      CI_paciente: 55678901,
      medicoEmail: "alfonso.torres@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-08T09:30:00-03:00"),
      CI_paciente: 56789012,
      medicoEmail: "sofia.fernandez@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-08T11:00:00-03:00"),
      CI_paciente: 57890123,
      medicoEmail: "laura.rodriguez@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-09T09:00:00-03:00"),
      CI_paciente: 58901234,
      medicoEmail: "diego.silva@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-09T10:30:00-03:00"),
      CI_paciente: 59012345,
      medicoEmail: "javier.gomez@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-10T09:00:00-03:00"),
      CI_paciente: 50123456,
      medicoEmail: "federico.lopez@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-10T10:00:00-03:00"),
      CI_paciente: 51234567,
      medicoEmail: "sebastian.acosta@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-10T11:00:00-03:00"),
      CI_paciente: 52345678,
      medicoEmail: "gonzalo.suarez@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-11T09:00:00-03:00"),
      CI_paciente: 53456789,
      medicoEmail: "martin.pereira@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-11T10:00:00-03:00"),
      CI_paciente: 54567890,
      medicoEmail: "carolina.mendez@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-12T10:00:00-03:00"),
      CI_paciente: 55678901,
      medicoEmail: "florencia.cabrera@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    

    {
      fecha_hora: new Date("2026-09-15T10:00:00-03:00"),
      CI_paciente: 51234567,
      medicoEmail: "lucas.barboza@clinica.com",
      estado: "PROGRAMADA" as const,
    },
    {
      fecha_hora: new Date("2026-09-15T10:00:00-03:00"),
      CI_paciente: 51234567,
      medicoEmail: "ana.sabedra@clinica.com",
      estado: "PROGRAMADA" as const,
    },
  ];

  for (const cita of citas) {
    const id_medico = medicos[cita.medicoEmail];

    if (!id_medico) {
      throw new Error(
        `No se encontró el médico con email: ${cita.medicoEmail}`
      );
    }

    await prisma.cita.upsert({
      where: {
        id_medico_fecha_hora: {
          id_medico,
          fecha_hora: cita.fecha_hora,
        },
      },
      update: {
        CI_paciente: cita.CI_paciente,
        estado: cita.estado,
      },
      create: {
        fecha_hora: cita.fecha_hora,
        CI_paciente: cita.CI_paciente,
        id_medico,
        estado: cita.estado,
      },
    });
  }
  );

  

  const cantidadEspecialidades = await prisma.especialidad.count();
  const cantidadUsuarios = await prisma.usuario.count();
  const cantidadMedicos = await prisma.medico.count();
  const cantidadPacientes = await prisma.paciente.count();
  const cantidadCitas = await prisma.cita.count();


  console.log(`Especialidades: ${cantidadEspecialidades}`);
  console.log(`Usuarios:       ${cantidadUsuarios}`);
  console.log(`Médicos:        ${cantidadMedicos}`);
  console.log(`Pacientes:      ${cantidadPacientes}`);
  console.log(`Citas:          ${cantidadCitas}`);

  
  // USUARIOS DE PRUEBA
 

  console.log(" USUARIOS DE PRUEBA");
  console.log("----------------------------------------");

  console.log("Médicos:");
  console.log("  Email: lucas.barboza@clinica.com");
  console.log("  Password: Medico123!");
  console.log("");

  console.log("Recepcionistas:");
  console.log(
    "  lucia.gonzalez@clinica.com / Recepcion123!"
  );
  console.log(
    "  diego.morales@clinica.com / Recepcion123!"
  );
  console.log("");

  console.log("Gerencia:");
  console.log(
    "  gerencia@clinica.com / Gerencia123!"
  );

  console.log("----------------------------------------\n");


  console.log("CASOS ÚTILES PARA PRUEBAS");
  console.log("----------------------------------------");

  console.log("Paciente:");
  console.log("  CI: 51234567");
  console.log("  Email: juan.perez@gmail.com");
  console.log("");

  console.log("Médico:");
  console.log("  Email: lucas.barboza@clinica.com");
  console.log("  Especialidad: Cardiología");
  console.log("");

  console.log("Cita completada:");
  console.log("  03/09/2026 09:00");
  console.log("");

  console.log("Cita cancelada:");
  console.log("  04/09/2026 11:00");
  console.log("");

  console.log("Citas programadas:");
  console.log("  Varias entre el 07/09/2026 y 15/09/2026");
  console.log("");

  console.log("Caso de mismo paciente a la misma hora:");
  console.log("  15/09/2026 10:00");
  console.log("  Médico: Lucas Barboza");
  console.log("  Médico: Ana Sabedra");
  console.log("  → Válido según tu regla de negocio");
  console.log("");

  console.log("----------------------------------------");
}

main()
  .catch((error) => {
    console.error(" Error al ejecutar el seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
