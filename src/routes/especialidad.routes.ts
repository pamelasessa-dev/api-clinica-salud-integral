import { Router } from "express";

import {
  getEspecialidades,
  getEspecialidadById,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad,
} from "../controllers/especialidad.controller";

const router: Router = Router();

router.get("/", getEspecialidades, (req, res) => {
  /*
  #swagger.tags = ['Especialidades']
  #swagger.summary = 'Obtener todas las especialidades'
  #swagger.description = 'Obtiene la lista completa de especialidades médicas registradas.'

  #swagger.responses[200] = {
    description: 'Lista de especialidades obtenida correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.get("/:id", getEspecialidadById, (req, res) => {
  /*
  #swagger.tags = ['Especialidades']
  #swagger.summary = 'Obtener una especialidad por ID'
  #swagger.description = 'Obtiene la información de una especialidad médica mediante su identificador.'

  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: 'Identificador de la especialidad',
    example: 1
  }

  #swagger.responses[200] = {
    description: 'Especialidad encontrada correctamente'
  }

  #swagger.responses[404] = {
    description: 'Especialidad no encontrada'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.post("/", createEspecialidad, (req, res) => {
  /*
  #swagger.tags = ['Especialidades']
  #swagger.summary = 'Crear una especialidad'
  #swagger.description = 'Registra una nueva especialidad médica en el sistema.'

  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Datos de la especialidad',
    schema: {
      nombre: 'Cardiología'
    }
  }

  #swagger.responses[201] = {
    description: 'Especialidad creada correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.put("/:id", updateEspecialidad, (req, res) => {
  /*
  #swagger.tags = ['Especialidades']
  #swagger.summary = 'Actualizar una especialidad'
  #swagger.description = 'Actualiza el nombre de una especialidad médica existente.'

  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: 'Identificador de la especialidad',
    example: 1
  }

  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Datos actualizados de la especialidad',
    schema: {
      nombre: 'Cardiología'
    }
  }

  #swagger.responses[200] = {
    description: 'Especialidad actualizada correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.delete("/:id", deleteEspecialidad, (req, res) => {
  /*
  #swagger.tags = ['Especialidades']
  #swagger.summary = 'Eliminar una especialidad'
  #swagger.description = 'Elimina una especialidad médica existente del sistema.'

  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: 'Identificador de la especialidad',
    example: 1
  }

  #swagger.responses[200] = {
    description: 'Especialidad eliminada correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

export default router;

