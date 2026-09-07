import prisma from "../config/prisma";

// Consulta de todos los pacientes
export const getPacientes = async () => {
    return await prisma.paciente.findMany();
};

// Consulta de paciente por CI
export const getPacienteByCI = async (CI: number) => {
    return await prisma.paciente.findUnique({
        where: {
            CI,
        },
    });
};

// Consulta de paciente por nombre
export const getPacienteByNombre = async (nombre: string) => {
    return await prisma.paciente.findMany({
        where: {
            nombre: {
                contains: nombre,
            },
        },
    });
};

// Creación de un nuevo paciente
export const createPaciente = async (data: {
    CI: number;
    nombre: string;
    apellido: string;
    email: string;
    fecha_nacimiento: Date;
    direccion: string;
    telefono: string;
}) => {
    return await prisma.paciente.create({
        data,
    });
};

// Actualización de un paciente existente
export const updatePaciente = async (
    CI: number,
    data: {
        nombre?: string;
        apellido?: string;
        email?: string;
        fecha_nacimiento?: Date;
        direccion?: string;
        telefono?: string;
    }
) => {
    return await prisma.paciente.update({
        where: {
            CI,
        },
        data,
    });
};

// Obtener expediente completo del paciente

export const getExpedientePaciente = async (CI: number) => {
    return await prisma.paciente.findUnique({
        where: {
            CI,
        },
        include: {
            citas: {
                orderBy: {
                    fecha_hora: "desc",
                },
                include: {
                    medico: {
                        include: {
                            especialidad: true,
                        },
                    },
                },
            },
        },
    });
};

// Eliminación de un paciente existente
export const deletePaciente = async (CI: number) => {
    return await prisma.paciente.delete({
        where: {
            CI,
        },
    });
};
