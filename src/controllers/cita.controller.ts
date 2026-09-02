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

export const getCitaByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const cita = await getCitaById(Number(id));

    if (!cita) {
      res.status(404).json({
        message: "Cita no encontrada",
      });

      return;
    }

    res.status(200).json(cita);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener la cita",
    });
  }
};

export const createCitaController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fecha_hora, CI_paciente, id_medico, estado } = req.body;

    const cita = await createCita({
      fecha_hora: new Date(fecha_hora),
      CI_paciente: Number(CI_paciente),
      id_medico: Number(id_medico),
      estado,
    });

    res.status(201).json(cita);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear la cita",
    });
  }
};

export const updateCitaController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { fecha_hora, CI_paciente, id_medico, estado } = req.body;

    const cita = await updateCita(Number(id), {
      ...(fecha_hora !== undefined && {
        fecha_hora: new Date(fecha_hora),
      }),
      ...(CI_paciente !== undefined && {
        CI_paciente: Number(CI_paciente),
      }),
      ...(id_medico !== undefined && {
        id_medico: Number(id_medico),
      }),
      ...(estado !== undefined && {
        estado,
      }),
    });

    res.status(200).json(cita);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al actualizar la cita",
    });
  }
};

export const deleteCitaController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await deleteCita(Number(id));

    res.status(200).json({
      message: "Cita eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al eliminar la cita",
    });
  }
};