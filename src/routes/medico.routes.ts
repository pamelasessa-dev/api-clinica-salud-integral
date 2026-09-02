import { Router } from "express";

import {
  medicoController,
  getMedicoByIdController,
  createMedicoController,
  updateMedicoController,
  deleteMedicoController,
} from "../controllers/medico.controller";

const router = Router();

router.get("/", medicoController.getAll);

router.get("/:id", getMedicoByIdController);

router.post("/", createMedicoController);

router.put("/:id", updateMedicoController);

router.delete("/:id", deleteMedicoController);

export default router;