import { z } from "zod";

export const updatePerfilSchema = z.object({
  nombre: z.string().trim().min(1).max(100).optional(),
  email: z.string().trim().email().max(255).optional(),
  telefono: z.string().trim().max(30).optional(),
});
