import { Router } from "express";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

import {
  medicoController,
  getMedicoByIdController,
  getAgendaMedicoController,
  createMedicoController,
  updateMedicoController,
  deleteMedicoController,
} from "../controllers/medico.controller";

const router: Router = Router();

// GET - Obtener todos los médicos
router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO"),
  medicoController.getAll,
  (req, res) => {
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
  }
);

// GET - Obtener agenda del médico autenticado
router.get(
  "/citas",
  verifyToken,
  authorize("MEDICO"),
  getAgendaMedicoController,
  (req, res) => {
    /*
    #swagger.tags = ['Médicos']
    #swagger.summary = 'Obtener agenda del médico autenticado'
    #swagger.description = 'Obtiene la agenda del médico correspondiente al usuario autenticado. Permite filtrar las citas mediante un rango de fechas.'

    #swagger.parameters['from'] = {
      in: 'query',
      required: false,
      type: 'string',
      format: 'date',
      description: 'Fecha inicial del rango de búsqueda',
      example: '2026-09-01'
    }

    #swagger.parameters['to'] = {
      in: 'query',
      required: false,
      type: 'string',
      format: 'date',
      description: 'Fecha final del rango de búsqueda',
      example: '2026-09-30'
    }

    #swagger.responses[200] = {
      description: 'Agenda obtenida correctamente'
    }

    #swagger.responses[400] = {
      description: 'Parámetros de fecha inválidos'
    }

    #swagger.responses[401] = {
      description: 'Token no proporcionado o inválido'
    }

    #swagger.responses[403] = {
      description: 'El usuario no tiene permisos para consultar la agenda'
    }

    #swagger.responses[404] = {
      description: 'No se encontró un médico asociado al usuario autenticado'
    }

    #swagger.responses[500] = {
      description: 'Error interno del servidor'
    }
    */
  }
);

// GET - Obtener médico por ID
router.get(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO"),
  getMedicoByIdController,
  (req, res) => {
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
  }
);

// POST - Crear médico
router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  createMedicoController,
  (req, res) => {
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
  }
);

// PUT - Actualizar médico
router.put(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA"),
  updateMedicoController,
  (req, res) => {
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
  }
);

// DELETE - Eliminar médico
router.delete(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA"),
  deleteMedicoController,
  (req, res) => {
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
  }
);

export default router;
