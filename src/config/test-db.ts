import prisma from "./prisma";

async function testConection() {
  try {
    await prisma.$connect();
    console.log("Conexión a PostgresSQL exitosa");
  } catch (error) {
    console.error("Error al conectar a PostgresSQL:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConection();