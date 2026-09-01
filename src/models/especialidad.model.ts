import prisma from "../config/prisma";

export const obtenerEspecialidades = async () => {
    return await prisma.especialidad.findMany({
        orderBy: {
            nombre: "asc",
        },
    });
};

