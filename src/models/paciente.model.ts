import prisma from "../config/prisma";

export const getPacientes = async () => {
    return await prisma.paciente.findMany();
}

export const getPacienteByCI = async (CI: number) => {
    return await prisma.paciente.findUnique({
        where: {
            CI,
        },
    });
};

export const createPaciente = async (data: { 
    CI: number;
    nombre: string; 
    apellido: string; 
    fecha_nacimiento: Date; 
    direccion: string; 
    telefono: string 
}) => {
    return await prisma.paciente.create({
        data,
    });
};

export const updatePaciente = async (CI: number, data: {
    nombre?: string;
    apellido?: string;
    fecha_nacimiento?: Date;
    direccion?: string;
    telefono?: string;
}) => {
    return await prisma.paciente.update({
        where: {
            CI,
        },
        data,
    });
};
export const deletePaciente = async (CI: number) => {
    return await prisma.paciente.delete({
        where: {
            CI,
        },
    });
};