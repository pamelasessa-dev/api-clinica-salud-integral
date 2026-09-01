import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Clinica Salud Integral", 
    description: "API para la gestión de la Clinica Salud Integral",
},
host: "localhost:3000",
schemes: ["http"],

};

const outputFile = "../swagger-output.json";
const endpointsFiles = ["./src/index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);