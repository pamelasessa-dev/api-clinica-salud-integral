import { Router } from "express";

import {
  medicoController,
  getMedicoByIdController,
  createMedicoController,
  updateMedicoController,
  deleteMedicoController,
} from "../controllers/medico.controller";

const router: Router = Router();

router.get("/", medicoController.getAll, (req, res) => {
  /*
  #swagger.tags = ['Médicos']
  #swagger.summary = 'Obtener médicos'
  #swagger.description = 'Obtiene la lista de médicos registrados. Permite filtrar por nombre, apellido o especialidad.'

  #swagger.parameters['nombre'] = {
    in: 'query',
    required: false,
    type: 'string',
    description: 'Filtrar médicos por nombre',
    example: 'Lucas'
  }

  #swagger.parameters['apellido'] = {
    in: 'query',
    required: false,
    type: 'string',
    description: 'Filtrar médicos por apellido',
    example: 'Barboza'
  }

  #swagger.parameters['id_especialidad'] = {
    in: 'query',
    required: false,
    type: 'integer',
    description: 'Filtrar médicos por identificador de especialidad',
    example: 1
  }

  #swagger.responses[200] = {
    description: 'Lista de médicos obtenida correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.get("/:id", getMedicoByIdController, (req, res) => {
  /*
  #swagger.tags = ['Médicos']
  #swagger.summary = 'Obtener un médico por ID'
  #swagger.description = 'Obtiene la información de un médico mediante su identificador.'

  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: 'Identificador del médico',
    example: 1
  }

  #swagger.responses[200] = {
    description: 'Médico encontrado correctamente'
  }

  #swagger.responses[404] = {
    description: 'Médico no encontrado'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.post("/", createMedicoController, (req, res) => {
  /*
  #swagger.tags = ['Médicos']
  #swagger.summary = 'Registrar un médico'
  #swagger.description = 'Registra un nuevo médico y lo relaciona con una especialidad y un usuario existente.'

  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Datos del médico',
    schema: {
      nombre: 'Juan',
      apellido: 'Pérez',
      id_especialidad: 1,
      id_usuario: 2
    }
  }

  #swagger.responses[201] = {
    description: 'Médico creado correctamente'
  }

  #swagger.responses[400] = {
    description: 'Faltan datos obligatorios'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.put("/:id", updateMedicoController, (req, res) => {
  /*
  #swagger.tags = ['Médicos']
  #swagger.summary = 'Actualizar un médico'
  #swagger.description = 'Actualiza la información de un médico existente.'

  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: 'Identificador del médico',
    example: 1
  }

  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Datos actualizados del médico',
    schema: {
      nombre: 'Juan',
      apellido: 'Pérez',
      id_especialidad: 2,
      id_usuario: 2
    }
  }

  #swagger.responses[200] = {
    description: 'Médico actualizado correctamente'
  }

  #swagger.responses[400] = {
    description: 'Faltan datos obligatorios'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.delete("/:id", deleteMedicoController, (req, res) => {
  /*
  #swagger.tags = ['Médicos']
  #swagger.summary = 'Eliminar un médico'
  #swagger.description = 'Elimina un médico existente del sistema.'

  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: 'Identificador del médico',
    example: 1
  }

  #swagger.responses[200] = {
    description: 'Médico eliminado correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

export default router;