import {Request, Response, NextFunction} from "express";
import type  { z } from "zod";

export const validateSchema = (schema: z.ZodType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await schema.parseAsync(req.body);
            req.body = data;
            next();
        } catch (error) {
            res.status(400).json({ 
                message: "Datos inválidos",
                error
            });
        }
    }
}