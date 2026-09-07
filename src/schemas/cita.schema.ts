import { z } from "zod";

export const citaSchema = z.object({
  fecha_hora: z.coerce.date(),
  CI_paciente: z.coerce.number().int().positive(),
  id_medico: z.coerce.number().int().positive(),
});

export const updateCitaSchema = z.object({
  fecha_hora: z.coerce.date().optional(),
  CI_paciente: z.coerce.number().int().positive().optional(),
  id_medico: z.coerce.number().int().positive().optional(),
  estado: z.enum(["PROGRAMADA", "COMPLETADA", "CANCELADA"]).optional(),
});

export const updateEstadoCitaSchema = z.object({
  estado: z.enum(["COMPLETADA", "CANCELADA"]),
});