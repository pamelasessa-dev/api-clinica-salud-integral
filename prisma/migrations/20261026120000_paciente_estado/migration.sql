-- CreateEnum
CREATE TYPE "EstadoPaciente" AS ENUM ('activo', 'inactivo', 'en_espera');

-- AlterTable
ALTER TABLE "pacientes"
ADD COLUMN "estado" "EstadoPaciente" NOT NULL DEFAULT 'activo';