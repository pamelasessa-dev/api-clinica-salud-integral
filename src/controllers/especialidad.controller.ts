import {Request, Response} from "express";
import {obtenerEspecialidades} from "../models/especialidad.model";

export const getEspecialidades = async (req: Request, res: Response) => {
    try {
        const especialidades = await obtenerEspecialidades();
        res.status(200).json(especialidades);
    } catch (error) {
        console.error("Error al obtener especialidades:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

