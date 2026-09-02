import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";
import dotenv from "dotenv";
import pacienteRoutes from "./routes/paciente.routes";
import especialidadRoutes from "./routes/especialidad.routes";
import medicoRoutes from "./routes/medico.routes";
import citaRoutes from "./routes/cita.routes";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/pacientes", pacienteRoutes);
app.use("/api/especialidades", especialidadRoutes);
app.use("/api/medicos", medicoRoutes);
app.use("/api/citas", citaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});