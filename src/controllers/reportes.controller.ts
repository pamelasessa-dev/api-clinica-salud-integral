import type { Request, Response } from "express";
import {
  getAppointmentsBySpecialty,
  getDailyCutoff,
} from "../models/reportes.model";

// Reporte de citas por especialidad
export const getAppointmentsBySpecialtyController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reporte = await getAppointmentsBySpecialty();

    res.status(200).json({
      data: reporte,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el reporte por especialidad",
    });
  }
};

// Reporte de corte operativo diario
export const getDailyCutoffController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date } = req.query;

    if (!date || typeof date !== "string") {
      res.status(400).json({
        message: "El parámetro date es obligatorio y debe tener formato YYYY-MM-DD",
      });
      return;
    }

    
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({
        message: "La fecha debe tener formato YYYY-MM-DD",
      });
      return;
    }

    const reporte = await getDailyCutoff(date);

 
    const completadas =
      reporte.find((item) => item.estado === "COMPLETADA")?._count.estado ?? 0;

    const canceladas =
      reporte.find((item) => item.estado === "CANCELADA")?._count.estado ?? 0;

    res.status(200).json({
      fecha: date,
      completadas,
      canceladas,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el corte operativo diario",
    });
  }
};
