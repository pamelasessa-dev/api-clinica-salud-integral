import { z } from "zod";

export const pacienteSchema = z.object({
    CI: z.number().int().positive(),
    nombre: z.string().min(2).max(100),
    apellido: z.string().min(2).max(100),
    fecha_nacimiento: z.coerce.date(),
    direccion: z.string().max(200),
    telefono: z.string().max(20)
});

export const updatePacienteSchema = pacienteSchema.partial();