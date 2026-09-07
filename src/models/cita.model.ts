import { EstadoCita } from "../../generated/prisma/client";
import prisma from "../config/prisma";

//listar todas las citas
export const getAllCitas = async (
  estado?: EstadoCita,
  desde?: Date,
  hasta?: Date,
) => {
  return await prisma.cita.findMany({
    where: {
      ...(estado && { estado }),

      ...(desde || hasta
        ? {
            fecha_hora: {
              ...(desde && { gte: desde }),
              ...(hasta && { lte: hasta }),
            },
          }
        : {}),
    },

    orderBy: {
      fecha_hora: "asc",
    },

    select: {
      id_cita: true,
      fecha_hora: true,
      estado: true,

      paciente: {
        select: {
          CI: true,
          nombre: true,
          apellido: true,
        },
      },

      medico: {
        select: {
          nombre: true,
          apellido: true,

          especialidad: {
            select: {
              nombre: true,
            },
          },
        },
      },
    },
  });
};

export const getCitaById = async (id: number) => {
  return await prisma.cita.findUnique({
    where: {
      id_cita: id,
    },
    select: {
      id_cita: true,
      fecha_hora: true,
      estado: true,

      paciente: {
        select: {
          CI: true,
          nombre: true,
          apellido: true,
          telefono: true,
        },
      },
      medico: {
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
      },
    },
  });
};

export const createCita = async (data: {
  fecha_hora: Date;
  CI_paciente: number;
  id_medico: number;
}) => {
  //  Verificar que la cita no sea en el pasado
  if (data.fecha_hora <= new Date()) {
    throw new Error("No se puede agendar una cita en el pasado");
  }

  // Verificar si el médico ya tiene una cita en ese horario
  const conflictoMedico = await prisma.cita.findFirst({
    where: {
      id_medico: data.id_medico,
      fecha_hora: data.fecha_hora,
    },
  });

  if (conflictoMedico) {
    throw new Error("El médico ya tiene una cita en ese horario");
  }

  // Verificar si el paciente ya tiene una cita en ese horario
  const conflictoPaciente = await prisma.cita.findFirst({
    where: {
      CI_paciente: data.CI_paciente,
      fecha_hora: data.fecha_hora,
    },
  });

  if (conflictoPaciente) {
    throw new Error("El paciente ya tiene una cita en ese horario");
  }

  // Crear cita
  return await prisma.cita.create({
    data,
  });
};

export const updateCita = async (
  id: number,
  data: {
    fecha_hora?: Date;
    CI_paciente?: number;
    id_medico?: number;
    estado?: EstadoCita;
  },
) => {
  return await prisma.cita.update({
    where: {
      id_cita: id,
    },
    data,
  });
};

export const updateCitaEstado = async (
  id: number,
  estado: EstadoCita,
  idUsuario: number,
) => {
  const medico = await prisma.medico.findUnique({
    where: {
      id_usuario: idUsuario,
    },
  });

  if (!medico) {
    throw new Error("El usuario no está asociado a un médico");
  }

  const cita = await prisma.cita.findUnique({
    where: {
      id_cita: id,
    },
  });

  if (!cita) {
    throw new Error("Cita no encontrada");
  }

  if (cita.id_medico !== medico.id_medico) {
    throw new Error("No tienes permiso para modificar esta cita");
  }

  return await prisma.cita.update({
    where: {
      id_cita: id,
    },
    data: {
      estado,
    },
  });
};

export const deleteCita = async (id: number) => {
  return await prisma.cita.delete({
    where: {
      id_cita: id,
    },
  });
};
