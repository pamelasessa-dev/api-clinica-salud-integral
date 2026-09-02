import {  Router } from "express";
import { getEspecialidades } from "../controllers/especialidad.controller";

const router = Router();

router.get("/", getEspecialidades);
router.get("/:id", getEspecialidades);
router.post("/", getEspecialidades);
router.put("/:id", getEspecialidades);
router.delete("/:id", getEspecialidades);

export default router;