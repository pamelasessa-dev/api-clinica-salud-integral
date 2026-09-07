import { z } from "zod";

export const pacienteSchema = z.object({
  CI: z.number().int().positive(),
  nombre: z.string().min(2).max(100),
  apellido: z.string().min(2).max(100),
  email: z.string().email(),
  fecha_nacimiento: z.coerce
  .date()
  .max(new Date(), "La fecha de nacimiento no puede ser futura"),
  direccion: z.string().max(200),
  telefono: z.string().max(20),
});

export const updatePacienteSchema = pacienteSchema.partial();
