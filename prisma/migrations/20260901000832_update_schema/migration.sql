/*
  Warnings:

  - You are about to drop the `Cita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Especialidad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RECEPCIONISTA', 'MEDICO', 'GERENCIA');

-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_CI_paciente_fkey";

-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_id_medico_fkey";

-- DropForeignKey
ALTER TABLE "Medico" DROP CONSTRAINT "Medico_id_especialidad_fkey";

-- DropTable
DROP TABLE "Cita";

-- DropTable
DROP TABLE "Especialidad";

-- DropTable
DROP TABLE "Medico";

-- DropTable
DROP TABLE "Paciente";

-- CreateTable
CREATE TABLE "pacientes" (
    "CI" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("CI")
);

-- CreateTable
CREATE TABLE "medicos" (
    "id_medico" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "id_especialidad" INTEGER NOT NULL,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id_medico")
);

-- CreateTable
CREATE TABLE "especialidades" (
    "id_especialidad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "especialidades_pkey" PRIMARY KEY ("id_especialidad")
);

-- CreateTable
CREATE TABLE "citas" (
    "id_cita" SERIAL NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL,
    "CI_paciente" INTEGER NOT NULL,
    "id_medico" INTEGER NOT NULL,
    "estado" "EstadoCita" NOT NULL DEFAULT 'PROGRAMADA',

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id_cita")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "medicos" ADD CONSTRAINT "medicos_id_especialidad_fkey" FOREIGN KEY ("id_especialidad") REFERENCES "especialidades"("id_especialidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_CI_paciente_fkey" FOREIGN KEY ("CI_paciente") REFERENCES "pacientes"("CI") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "medicos"("id_medico") ON DELETE RESTRICT ON UPDATE CASCADE;
