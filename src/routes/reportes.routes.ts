import { Router } from "express";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

import {
  getAppointmentsBySpecialtyController,
  getDailyCutoffController,
} from "../controllers/reportes.controller";

const router: Router = Router();

router.get(
  "/appointments-by-specialty",
  verifyToken,
  authorize("GERENCIA"),
  getAppointmentsBySpecialtyController,
  (req, res) => {
    /*
      #swagger.tags = ['Reportes']
      #swagger.summary = 'Obtener citas por especialidad'
      #swagger.description = 'Obtiene el total de citas agrupadas por especialidad médica.'
      #swagger.responses[200] = {
        description: 'Reporte obtenido correctamente'
      }
      #swagger.responses[401] = {
        description: 'Token no proporcionado o inválido'
      }
      #swagger.responses[403] = {
        description: 'El usuario no tiene permisos de gerencia'
      }
      #swagger.responses[500] = {
        description: 'Error interno del servidor'
      }
    */
  }
);

router.get(
  "/daily-cutoff",
  verifyToken,
  authorize("GERENCIA"),
  getDailyCutoffController,
  (req, res) => {
    /*
      #swagger.tags = ['Reportes']
      #swagger.summary = 'Obtener corte operativo diario'
      #swagger.description = 'Obtiene la cantidad de citas completadas y canceladas en una fecha específica.'

      #swagger.parameters['date'] = {
        in: 'query',
        required: true,
        type: 'string',
        format: 'date',
        description: 'Fecha del corte en formato YYYY-MM-DD',
        example: '2026-09-07'
      }

      #swagger.responses[200] = {
        description: 'Corte operativo obtenido correctamente'
      }

      #swagger.responses[400] = {
        description: 'Fecha inválida o no proporcionada'
      }

      #swagger.responses[401] = {
        description: 'Token no proporcionado o inválido'
      }

      #swagger.responses[403] = {
        description: 'El usuario no tiene permisos de gerencia'
      }

      #swagger.responses[500] = {
        description: 'Error interno del servidor'
      }
    */
  }
);

export default router;
