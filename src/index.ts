import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";
import dotenv from "dotenv";
import cors from "cors";

import pacienteRoutes from "./routes/paciente.routes";
import especialidadRoutes from "./routes/especialidad.routes";
import medicoRoutes from "./routes/medico.routes";
import citaRoutes from "./routes/cita.routes";
import authRoutes from "./routes/auth.routes";
import reportesRoutes from "./routes/reportes.routes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
  /*
  #swagger.tags = ['Servidor']
  #swagger.summary = 'Verificar estado del servidor'
  #swagger.description = 'Comprueba que la API de la Clínica Salud Integral se encuentra funcionando correctamente.'

  #swagger.responses[200] = {
    description: 'El servidor está funcionando correctamente',
    schema: {
      message: 'El servidor está funcionando'
    }
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */

  try {
    res.status(200).json({
      message: "El servidor está funcionando"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
});


app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/especialidades", especialidadRoutes);
app.use("/api/medicos", medicoRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/reports", reportesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
