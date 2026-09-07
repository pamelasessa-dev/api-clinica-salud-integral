import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import {
  getCitas,
  getCitaByIdController,
  createCitaController,
  updateCitaController,
  updateCitaEstadoController,
  deleteCitaController,
} from "../controllers/cita.controller";
import { validateSchema } from "../middlewares/validateSchema";
import { updateEstadoCitaSchema } from "../schemas/cita.schema";

const router: Router = Router();


router.get("/", 
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO"),
  getCitas.getAll, (req, res) => {
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

router.patch(
  "/:id/status",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validateSchema(updateEstadoCitaSchema),
  updateCitaEstadoController,
  (req, res) => {
    /*
      #swagger.tags = ['Citas']
      #swagger.summary = 'Actualizar estado de una cita'
      #swagger.description = 'Actualiza el estado de una cita médica existente.'

      #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'integer',
        description: 'Identificador de la cita'
      }

      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        description: 'Nuevo estado de la cita',
        schema: {
          estado: 'CONFIRMADA'
        }
      }

      #swagger.responses[200] = {
        description: 'Estado de la cita actualizado correctamente'
      }

      #swagger.responses[400] = {
        description: 'Datos inválidos'
      }

      #swagger.responses[401] = {
        description: 'Token no proporcionado o inválido'
      }

      #swagger.responses[403] = {
        description: 'El usuario no tiene permisos'
      }

      #swagger.responses[404] = {
        description: 'Cita no encontrada'
      }

      #swagger.responses[500] = {
        description: 'Error interno del servidor'
      }
    */
  }
);

router.get(
  "/:id", 
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO"),
  getCitaByIdController, (req, res) => {
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

router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  createCitaController, (req, res) => {
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

router.put(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA"),
  updateCitaController, (req, res) => {
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


router.delete(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA"),
  deleteCitaController, (req, res) => {
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
