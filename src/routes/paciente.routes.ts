import { Router } from "express";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

import {
  getPacientesController,
  getPacienteByCIController,
  getExpedientePacienteController,
  postPacienteController,
  putPacienteController,
  deletePacienteController,
} from "../controllers/paciente.controller";

import { validateSchema } from "../middlewares/validateSchema";
import {
  pacienteSchema,
  updatePacienteSchema,
} from "../schemas/paciente.schema";

const router: Router = Router();

// GET - Obtener todos los pacientes
router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO", "GERENCIA"),
  getPacientesController,
  (req, res) => {
    /*
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Obtener todos los pacientes'
    #swagger.description = 'Obtiene pacientes registrados. Permite filtrar por nombre, apellido o email mediante query.'

    #swagger.parameters['query'] = {
      in: 'query',
      required: false,
      type: 'string',
      description: 'Filtra pacientes por nombre, apellido o email',
      example: 'Carlos'
    }

    #swagger.responses[200] = {
      description: 'Lista de pacientes obtenida correctamente',
      schema: [{ $ref: '#/definitions/Paciente' }]
    }

    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: { message: 'Error interno del servidor' }
    }
    */
  }
);

// GET - Obtener expediente completo del paciente
router.get(
  "/:CI/expediente",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO", "GERENCIA"),
  getExpedientePacienteController,
  (req, res) => {
    /*
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Obtener expediente completo de un paciente'
    #swagger.description = 'Obtiene los datos completos del paciente junto con su historial de citas, incluyendo el médico y la especialidad de cada cita.'

    #swagger.parameters['CI'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'Cédula de identidad del paciente',
      example: 45678901
    }

    #swagger.responses[200] = {
      description: 'Expediente obtenido correctamente',
      schema: {
        ...({ CI: 45678901, nombre: 'Carlos', apellido: 'Duarte', email: 'carlos.duarte@gmail.com', fecha_nacimiento: '1990-05-15T00:00:00.000Z', direccion: 'Av. Italia 1234', telefono: '099123456', estado: 'activo' }),
        citas: [{ id: 1, fecha: '2026-10-26T10:00:00.000Z', estado: 'programada', medico: { nombre: 'Ana', apellido: 'Pérez', especialidad: 'Cardiología' } }]
      }
    }

    #swagger.responses[400] = {
      description: 'CI inválido'
    }

    #swagger.responses[401] = {
      description: 'Token no proporcionado o inválido'
    }

    #swagger.responses[403] = {
      description: 'El usuario no tiene permisos para consultar el expediente'
    }

    #swagger.responses[404] = {
      description: 'Paciente no encontrado'
    }

    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: { message: 'Error interno del servidor' }
    }
    */
  }
);

// GET - Obtener paciente por CI
router.get(
  "/:CI",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO", "GERENCIA"),
  getPacienteByCIController,
  (req, res) => {
    /*
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Obtener un paciente por CI'
    #swagger.description = 'Obtiene la información de un paciente mediante su cédula de identidad.'

    #swagger.parameters['CI'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'Cédula de identidad del paciente',
      example: 45678901
    }

    #swagger.responses[200] = {
      description: 'Paciente encontrado correctamente',
      schema: { $ref: '#/definitions/Paciente' }
    }

    #swagger.responses[404] = {
      description: 'Paciente no encontrado'
    }

    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: { message: 'Error interno del servidor' }
    }
    */
  }
);

// POST - Crear paciente
router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validateSchema(pacienteSchema),
  postPacienteController,
  (req, res) => {
    /*
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Registrar un paciente'
    #swagger.description = 'Registra un nuevo paciente. estado admite: activo, inactivo o en_espera; si se omite, se asigna activo.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Datos del paciente a registrar',
      schema: {
        CI: 45678901,
        nombre: 'Carlos',
        apellido: 'Duarte',
        email: 'carlos.duarte@gmail.com',
        fecha_nacimiento: '1990-05-15',
        direccion: 'Av. Italia 1234',
        telefono: '099123456',
        estado: 'activo'
      }
    }

    #swagger.responses[201] = {
      description: 'Paciente creado correctamente',
      schema: { CI: 45678901, nombre: 'Carlos', apellido: 'Duarte', email: 'carlos.duarte@gmail.com', fecha_nacimiento: '1990-05-15T00:00:00.000Z', direccion: 'Av. Italia 1234', telefono: '099123456', estado: 'activo' }
    }

    #swagger.responses[400] = {
      description: 'Datos inválidos; estado debe ser activo, inactivo o en_espera',
      schema: { message: 'Datos inválidos', errors: [] }
    }

    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: { message: 'Error interno del servidor' }
    }
    */
  }
);

// PUT - Actualizar paciente
router.put(
  "/:CI",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validateSchema(updatePacienteSchema),
  putPacienteController,
  (req, res) => {
    /*
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Actualizar un paciente'
    #swagger.description = 'Actualiza la información de un paciente existente mediante CI. estado admite: activo, inactivo o en_espera.'

    #swagger.parameters['CI'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'Cédula de identidad del paciente',
      example: 45678901
    }

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Datos del paciente a actualizar',
      schema: {
        nombre: 'Javier',
        apellido: 'Ramirez',
        email: 'javi@gmail.com',
        fecha_nacimiento: '1990-05-15',
        direccion: 'Av. Italia 1234',
        telefono: '099123456',
        estado: 'activo'
      }
    }

    #swagger.responses[200] = {
      description: 'Paciente actualizado correctamente',
      schema: { CI: 45678901, nombre: 'Carlos', apellido: 'Duarte', email: 'carlos.duarte@gmail.com', fecha_nacimiento: '1990-05-15T00:00:00.000Z', direccion: 'Av. Italia 1234', telefono: '099123456', estado: 'activo' }
    }

    #swagger.responses[400] = {
      description: 'Datos inválidos; estado debe ser activo, inactivo o en_espera',
      schema: { message: 'Datos inválidos', errors: [] }
    }

    #swagger.responses[404] = {
      description: 'Paciente no encontrado'
    }

    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: { message: 'Error interno del servidor' }
    }
    */
  }
);

// DELETE - Eliminar paciente
router.delete(
  "/:CI",
  verifyToken,
  authorize("RECEPCIONISTA"),
  deletePacienteController,
  (req, res) => {
    /*
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Eliminar un paciente'
    #swagger.description = 'Elimina un paciente existente mediante su cédula de identidad.'

    #swagger.parameters['CI'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'Cédula de identidad del paciente',
      example: 45678901
    }

    #swagger.responses[200] = {
      description: 'Paciente eliminado correctamente',
      schema: { message: 'Paciente eliminado' }
    }

    #swagger.responses[404] = {
      description: 'Paciente no encontrado'
    }

    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: { message: 'Error interno del servidor' }
    }
    */
  }
);

export default router;