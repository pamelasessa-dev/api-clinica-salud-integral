import { Router } from "express";

import {
  getCitas,
  getCitaByIdController,
  createCitaController,
  updateCitaController,
  deleteCitaController,
} from "../controllers/cita.controller";

const router: Router = Router();


router.get("/", getCitas.getAll, (req, res) => {
  /*
  #swagger.tags = ['Citas']
  #swagger.summary = 'Obtener citas'
  #swagger.description = 'Obtiene la lista de citas médicas. Permite filtrar las citas por su estado.'

  #swagger.parameters['estado'] = {
    in: 'query',
    required: false,
    type: 'string',
    enum: ['PROGRAMADA', 'COMPLETADA', 'CANCELADA'],
    description: 'Estado de la cita',
    example: 'PROGRAMADA'
  }

  #swagger.responses[200] = {
    description: 'Lista de citas obtenida correctamente'
  }

  #swagger.responses[400] = {
    description: 'Estado de cita inválido'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.get("/:id", getCitaByIdController, (req, res) => {
  /*
  #swagger.tags = ['Citas']
  #swagger.summary = 'Obtener una cita por ID'
  #swagger.description = 'Obtiene la información de una cita médica mediante su identificador.'

  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: 'Identificador de la cita',
    example: 1
  }

  #swagger.responses[200] = {
    description: 'Cita encontrada correctamente'
  }

  #swagger.responses[404] = {
    description: 'Cita no encontrada'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.post("/", createCitaController, (req, res) => {
  /*
  #swagger.tags = ['Citas']
  #swagger.summary = 'Crear una cita'
  #swagger.description = 'Registra una nueva cita médica asociando un paciente con un médico.'

  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Datos de la cita',
    schema: {
      fecha_hora: '2026-09-15T10:30:00.000Z',
      CI_paciente: 45678901,
      id_medico: 1,
      estado: 'PROGRAMADA'
    }
  }

  #swagger.responses[201] = {
    description: 'Cita creada correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.put("/:id", updateCitaController, (req, res) => {
  /*
  #swagger.tags = ['Citas']
  #swagger.summary = 'Actualizar una cita'
  #swagger.description = 'Actualiza los datos de una cita médica existente.'

  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: 'Identificador de la cita',
    example: 1
  }

  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Datos de la cita a actualizar',
    schema: {
      fecha_hora: '2026-09-15T11:00:00.000Z',
      CI_paciente: 45678901,
      id_medico: 2,
      estado: 'COMPLETADA'
    }
  }

  #swagger.responses[200] = {
    description: 'Cita actualizada correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.delete("/:id", deleteCitaController, (req, res) => {
  /*
  #swagger.tags = ['Citas']
  #swagger.summary = 'Eliminar una cita'
  #swagger.description = 'Elimina una cita médica existente.'

  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: 'Identificador de la cita',
    example: 1
  }

  #swagger.responses[200] = {
    description: 'Cita eliminada correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

export default router;
