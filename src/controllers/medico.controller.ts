import { Request, Response } from 'express';
import { medicoModel } from '../models/medico.model';


export const medicoController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const { nombre, apellido, id_especialidad } = req.query;

      const medicos = await medicoModel.findAll(
        nombre as string | undefined,
        apellido as string | undefined,
        id_especialidad
          ? Number(id_especialidad)
          : undefined
      );

      res.json(medicos);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error al obtener los médicos",
      });
    }
  },
};

export const getMedicoByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const medico = await medicoModel.findById(Number(id));
        if (!medico) {
            return res.status(404).json({
                message: "Médico no encontrado",
            });
        }
        res.json(medico);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al obtener al médico",
        });

    }
};
export const createMedicoController = async (req: Request, res: Response) => {
    try{
        const { nombre, apellido, id_especialidad } = req.body;
        const medico = await medicoModel.create(nombre,apellido,id_especialidad);
        res.status(201).json(medico);

    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Error al intentar crear el médico",
        });

    }
}
export const updateMedicoController = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const { nombre, apellido, id_especialidad } = req.body;
        const medico = await medicoModel.update(Number(id),nombre,apellido,id_especialidad);
        res.status(200).json(medico);

    }catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Error al intentar actualizar el médico",
        });
    }

}
 export const deleteMedicoController = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        await medicoModel.delete(Number(id));
        res.status(200).json({
            message: "Médico eliminado correctamente",
        });

    }catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Error al intentar eliminar el médico",
        });
    }
 }