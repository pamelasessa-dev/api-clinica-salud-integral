import { Router } from "express";

import {
  getPacientesController,
  getPacienteByCIController,
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

router.get("/", getPacientesController, (req, res) => {
  /*
  #swagger.tags = ['Pacientes']
  #swagger.summary = 'Obtener todos los pacientes'
  #swagger.description = 'Obtiene la lista completa de pacientes registrados en la clínica.'

  #swagger.responses[200] = {
    description: 'Lista de pacientes obtenida correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});


router.get("/:CI", getPacienteByCIController, (req, res) => {
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
    description: 'Paciente encontrado correctamente'
  }

  #swagger.responses[404] = {
    description: 'Paciente no encontrado'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});


router.post(
  "/",
  validateSchema(pacienteSchema),
  postPacienteController,
  (req, res) => {
    /*
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Registrar un paciente'
    #swagger.description = 'Registra un nuevo paciente en el sistema.'

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
        telefono: '099123456'
      }
    }

    #swagger.responses[201] = {
      description: 'Paciente creado correctamente'
    }

    #swagger.responses[400] = {
      description: 'Datos del paciente inválidos'
    }

    #swagger.responses[500] = {
      description: 'Error interno del servidor'
    }
    */
  }
);


router.put(
  "/:CI",
  validateSchema(updatePacienteSchema),
  putPacienteController,
  (req, res) => {
    /*
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Actualizar un paciente'
    #swagger.description = 'Actualiza la información de un paciente existente mediante su cédula de identidad.'

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
        telefono: '099123456'
      }
    }

    #swagger.responses[200] = {
      description: 'Paciente actualizado correctamente'
    }

    #swagger.responses[400] = {
      description: 'Datos del paciente inválidos'
    }

    #swagger.responses[404] = {
      description: 'Paciente no encontrado'
    }

    #swagger.responses[500] = {
      description: 'Error interno del servidor'
    }
    */
  }
);


router.delete("/:CI", deletePacienteController, (req, res) => {
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
    description: 'Paciente eliminado correctamente'
  }

  #swagger.responses[404] = {
    description: 'Paciente no encontrado'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});


export default router;
