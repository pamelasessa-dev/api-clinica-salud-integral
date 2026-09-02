import { Router } from "express";

import {
  getCitas,
  getCitaByIdController,
  createCitaController,
  updateCitaController,
  deleteCitaController,
} from "../controllers/cita.controller";

const router = Router();

router.get("/", getCitas.getAll);

router.get("/:id", getCitaByIdController);

router.post("/", createCitaController);

router.put("/:id", updateCitaController);

router.delete("/:id", deleteCitaController);

export default router;