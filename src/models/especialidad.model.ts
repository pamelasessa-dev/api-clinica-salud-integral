import prisma from "../config/prisma";

// consulta de todas las especialidades
export const obtenerEspecialidades = async () => {
    return await prisma.especialidad.findMany({
        orderBy: {
            nombre: "asc",
        },
    });
};
// consulta de especialidad por id
export const obtenerEspecialidadPorId = async (id_especialidad: number) => {
    return await prisma.especialidad.findUnique({
        where: {
            id_especialidad: id_especialidad
        }
    });
};

// creación de una nueva especialidad
export const crearEspecialidad = async (nombre: string) => {
    return await prisma.especialidad.create({
        data: {
            nombre: nombre
        }
    });
};
// actualización de una especialidad existente
export const actualizarEspecialidad = async (id_especialidad: number, nombre: string) => {
    return await prisma.especialidad.update({
        where: {
            id_especialidad: id_especialidad
        },
        data: {
            nombre: nombre
        }
    });
};
// eliminación de una especialidad existente
export const eliminarEspecialidad = async (id_especialidad: number) => {
    return await prisma.especialidad.delete({
        where: {
            id_especialidad: id_especialidad
        }
    });
};
