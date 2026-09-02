import prisma from "../config/prisma";


// consulta de todos los pacientes
export const getPacientes = async () => {
    return await prisma.paciente.findMany();
}

//consulta de paciente por CI
export const getPacienteByCI = async (CI: number) => {
    return await prisma.paciente.findUnique({
        where: {
            CI,
        },
    });
};
//consulta de paciente por nombre
export const getPacienteByNombre = async (nombre: string) => {
    return await prisma.paciente.findMany({
        where: {
            nombre: {
                contains: nombre,
            },
        },
    });
};

// creación de un nuevo paciente
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

// actualización de un paciente existente
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

// eliminación de un paciente existente
export const deletePaciente = async (CI: number) => {
    return await prisma.paciente.delete({
        where: {
            CI,
        },
    });
};