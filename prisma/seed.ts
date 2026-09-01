import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({
  adapter,
});

async function main(){
    const cardiología = await prisma.especialidad.create({
        data: {
            nombre: "Cardiología",
        },
    });

    const pediatría = await prisma.especialidad.create({
        data: {
            nombre: "Pediatría",
        },
    });

    const dermatalogía = await prisma.especialidad.create({
        data: {
            nombre: "Dermatología",
        },
    });

    await prisma.medico.createMany({
        data: [
            {
                nombre: "Lucas",
                apellido: "Barboza",
                id_especialidad: cardiología.id_especialidad,
            },
            {   
                nombre: "María",
                apellido: "Santos",
                id_especialidad: pediatría.id_especialidad,
            },
            {
                nombre: "Favian",
                apellido: "Ramirez",
                id_especialidad: dermatalogía.id_especialidad,
            },
            {
                nombre: "Ana",
                apellido: "Sabedra",
                id_especialidad: cardiología.id_especialidad,   
            },
            {
                nombre: "Estefania",
                apellido: "Duarte",
                id_especialidad: pediatría.id_especialidad,
            },
            {
                nombre: "Alfonso",
                apellido: "Torres",
                id_especialidad: dermatalogía.id_especialidad,

            },
        ],
    });

    console.log("Datos de especialidades y médicos insertados correctamente.");
}

main()
.catch((error) => {
    console.error("Error al insertar datos:", error);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect(); 
});