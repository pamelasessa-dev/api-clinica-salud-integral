import type { Request, Response } from "express";
import { EstadoCita } from "../../generated/prisma/client";
import {
  getAllCitas,
  getCitaById,
  createCita,
  updateCita,
  updateCitaEstado,
  deleteCita,
} from "../models/cita.model";
import {
  citaSchema,
  updateCitaSchema,
  updateEstadoCitaSchema,
} from "../schemas/cita.schema";

export const getCitas = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const { estado, desde, hasta } = req.query;

      // Validar estado
      if (estado && typeof estado !== "string") {
        res.status(400).json({
          error: "El estado debe ser una cadena de texto",
        });

        return;
      }

      // Validar que estado pertenezca al enum EstadoCita
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

      // Validar desde
      if (desde && typeof desde !== "string") {
        res.status(400).json({
          error: "El parámetro desde debe ser una cadena de texto",
        });

        return;
      }

      // Validar hasta
      if (hasta && typeof hasta !== "string") {
        res.status(400).json({
          error: "El parámetro hasta debe ser una cadena de texto",
        });

        return;
      }

      // Convertir las fechas de string a Date
      const citas = await getAllCitas(
        estado as EstadoCita | undefined,
        desde ? new Date(desde) : undefined,
        hasta ? new Date(hasta) : undefined
      );

      res.status(200).json({
        data: citas,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Error al obtener las citas",
      });
    }
  },
};

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
    const result = citaSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Datos de cita inválidos",
        errors: result.error.issues,
      });
      return;
    }

    const cita = await createCita(result.data);

    res.status(201).json(cita);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "No se puede agendar una cita en el pasado" ||
        error.message === "El médico ya tiene una cita en ese horario" ||
        error.message === "El paciente ya tiene una cita en ese horario"
      ) {
        res.status(409).json({
          message: error.message,
        });
        return;
      }

      res.status(400).json({
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};


export const updateCitaController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = updateCitaSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Datos de cita inválidos",
        errors: result.error.issues,
      });
      return;
    }

    const { id } = req.params;

    const data = result.data;

    const cita = await updateCita(Number(id), {
      ...(data.fecha_hora !== undefined && {
        fecha_hora: data.fecha_hora,
      }),
      ...(data.CI_paciente !== undefined && {
        CI_paciente: data.CI_paciente,
      }),
      ...(data.id_medico !== undefined && {
        id_medico: data.id_medico,
      }),
      ...(data.estado !== undefined && {
        estado: data.estado,
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

export const updateCitaEstadoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validamos el body con Zod
    const result = updateEstadoCitaSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Estado de cita inválido",
        errors: result.error.issues,
      });
      return;
    }

    const { id } = req.params;
    const { estado } = result.data;

    // El verifyToken ya colocó el usuario en req.user
    if (!req.user) {
      res.status(401).json({
        message: "Usuario no autenticado",
      });
      return;
    }

    const cita = await updateCitaEstado(
      Number(id),
      estado,
      req.user.id
    );

    res.status(200).json(cita);
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "Cita no encontrada"
    ) {
      res.status(404).json({
        message: error.message,
      });
      return;
    }

    if (
      error instanceof Error &&
      (
        error.message === "El usuario no está asociado a un médico" ||
        error.message === "No tienes permiso para modificar esta cita"
      )
    ) {
      res.status(403).json({
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error al actualizar el estado de la cita",
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
