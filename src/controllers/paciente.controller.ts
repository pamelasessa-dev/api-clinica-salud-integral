import {Request, Response} from "express";
import {getPacientes, getPacienteByCI,getExpedientePaciente, createPaciente, updatePaciente, deletePaciente} from "../models/paciente.model";

export const getPacientesController = async (req: Request, res: Response) => {
    try {
        const pacientes = await getPacientes(); 
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pacientes" });
    }
};

export const getPacienteByCIController = async (req: Request, res: Response) => {
    try{
        const  CI = Number(req.params.CI);
        const paciente = await getPacienteByCI(CI);
        if (paciente) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({ message: "Paciente no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener paciente" });
    }
};
// OBTENER EXPEDIENTE COMPLETO DEL PACIENTE

export const getExpedientePacienteController = async (
    req: Request,
    res: Response,
) => {
    try {
        const CI = Number(req.params.CI);

        if (isNaN(CI)) {
            return res.status(400).json({
                message: "El CI debe ser un número válido",
            });
        }

        const expediente = await getExpedientePaciente(CI);

        if (!expediente) {
            return res.status(404).json({
                message: "Paciente no encontrado",
            });
        }

        res.status(200).json(expediente);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al obtener el expediente del paciente",
        });
    }
};

export const postPacienteController = async (req: Request, res: Response) => {
    const { CI, nombre, apellido,email, fecha_nacimiento, direccion, telefono } = req.body;
    try {
        const paciente = await createPaciente({ CI, nombre, apellido, email, fecha_nacimiento, direccion, telefono });
        res.status(201).json(paciente);
    } catch (error) {
        res.status(500).json({ message: "Error al crear paciente" });
    }
};

export const putPacienteController = async (req: Request, res: Response) => {
    try {
        const CI = Number(req.params.CI);
        const paciente = await updatePaciente(CI, req.body);
        res.status(200).json(paciente);
    } catch (error) {
        res.status(404).json({ message: "Paciente no encontrado" });
    }
};

export const deletePacienteController = async (req: Request, res: Response) => {
    try {
        const CI = Number(req.params.CI);
        await deletePaciente(CI);
        res.status(200).json({ message: "Paciente eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar paciente" });
    }
};
