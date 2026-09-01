import {Router} from "express";
import {getPacientesController, 
    getPacienteByCIController, 
    postPacienteController, 
    putPacienteController, 
    deletePacienteController
} from "../controllers/paciente.controller";
import { validateSchema } from "../middlewares/validateSchema";
import { pacienteSchema, updatePacienteSchema } from "../schemas/paciente.schema";

const router = Router();

router.get("/", getPacientesController);
router.get("/:CI", getPacienteByCIController);
router.post("/", validateSchema(pacienteSchema), postPacienteController);
router.put("/:CI", validateSchema(updatePacienteSchema), putPacienteController);
router.delete("/:CI", deletePacienteController);

export default router;
