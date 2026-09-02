import type  { Request, Response } from "express";
import { EstadoCita } from "../../generated/prisma/client";
import {
    getAllCitas,
    getCitaById,
    createCita,
    updateCita,
    deleteCita,
} from "../models/cita.model";


export const getCitas = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const { estado } = req.query;

        // si se recibe el estado, debe ser una cadena de texto
        if (estado && typeof estado !== "string") {
            res.status(400).json({
                error: "El estado debe ser una cadena de texto",
            });

            return;
        }

        // estado pertenece al enum EstadoCita?
        if (
            estado &&
            !Object.values(EstadoCita).includes(
                estado as EstadoCita
            )
        ) {
            res.status(400).json({
                error: "Estado de cita inválido",
                estadosPermitidos: Object.values(EstadoCita),
            });

            return;
        }

        // Si no se recibe, será undefined y traerá todas las citas.
        const citas = await getAllCitas(
            estado as EstadoCita | undefined
        );

        res.status(200).json({
            data: citas,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener las citas",
        });
    }
},
}