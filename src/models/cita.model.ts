import { EstadoCita } from "../../generated/prisma/client";
import prisma from "../config/prisma";

//listar todas las citas

export const getAllCitas = async (
     estado?: EstadoCita,
) => {
   
    return await prisma.cita.findMany({
        where: {
            ...(estado && { estado }), 
            //si estado es diferente de undefined, se agrega a la consulta
        },
        orderBy: {
            fecha_hora: "asc", 
            //ordenar por fecha y hora de manera ascendente
        },
        select: { 
            //informacion que quiero devolver
            id_cita: true,
            fecha_hora: true,
            estado:true,
            //Relacion Cita - Paciente
            paciente: {
                select: {
                    CI: true,
                    nombre: true,
                    apellido: true,
                },
            },
            //Relacion Cita - Medico - Especialidad
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

export const getCitaById = async (id:number) => {
    return await prisma.cita.findUnique({
        where:{
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
            medico:{
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
            }
        },
    });
};


export const createCita = async (data: {
    fecha_hora: Date;
    CI_paciente: number;
    id_medico: number;
    estado: EstadoCita;
}) => {
    return await prisma.cita.create({
        data,
    });
};

export const updateCita = async (id: number, data: {
    fecha_hora?: Date;
    CI_paciente?: number;
    id_medico?: number;
    estado?: EstadoCita;
}) => {
    return await prisma.cita.update({
        where: {
            id_cita: id,
        },
        data,
    });
};

export const deleteCita = async (id: number) => {
    return await prisma.cita.delete({
        where: {
            id_cita: id,
        },
    });
};
