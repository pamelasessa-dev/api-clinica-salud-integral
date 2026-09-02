import {Request, Response} from "express";
import {actualizarEspecialidad, 
    crearEspecialidad, 
    eliminarEspecialidad, 
    obtenerEspecialidades, 
    obtenerEspecialidadPorId
} from "../models/especialidad.model";

export const getEspecialidades = async (req: Request, res: Response) => {
    try {
        const especialidades = await obtenerEspecialidades();
        res.status(200).json(especialidades);
    } catch (error) {
        console.error("Error al obtener especialidades:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getEspecialidadById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const especialidad = await obtenerEspecialidadPorId(Number(id));
        if (!especialidad) {
            return res.status(404).json({ message: "Especialidad no encontrada" });
        }
        res.status(200).json(especialidad);
    } catch (error) {
        console.error("Error al obtener especialidad por ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const createEspecialidad = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.body;
        const nuevaEspecialidad = await crearEspecialidad(nombre);
        res.status(201).json({ message: "Especialidad creada exitosamente" });
    } catch (error) {
        console.error("Error al crear especialidad:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const updateEspecialidad = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const especialidadActualizada = await actualizarEspecialidad(Number(id), nombre);
        res.status(200).json({ message: "Especialidad actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar especialidad:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deleteEspecialidad = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await eliminarEspecialidad(Number(id));
        res.status(200).json({ message: "Especialidad eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar especialidad:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}