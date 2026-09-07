import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Clínica Salud Integral",
    version: "1.0.0",
    description:
      "API REST para la gestión de pacientes, médicos, especialidades, citas y usuarios de la Clínica Salud Integral.",
  },

  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],

  tags: [
    {
      name: "Autenticación",
      description: "Registro e inicio de sesión de usuarios",
    },
    {
      name: "Pacientes",
      description: "Operaciones relacionadas con pacientes",
    },
    {
      name: "Especialidades",
      description: "Gestión de especialidades médicas",
    },
    {
      name: "Médicos",
      description: "Gestión de médicos",
    },
    {
      name: "Citas",
      description: "Gestión de citas médicas",
    },
  ],

  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Ingrese el token JWT con el formato: Bearer {token}",
    },
  },

  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = "../swagger-output.json";
const endpointsFiles = ["./src/index.ts",];

swaggerAutogen({
  autoHeaders: false,
})(outputFile, endpointsFiles, doc);