-- CreateEnum
CREATE TYPE "EstadoCita" AS ENUM ('PROGRAMADA', 'COMPLETADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "Paciente" (
    "CI" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("CI")
);

-- CreateTable
CREATE TABLE "Medico" (
    "id_medico" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "id_especialidad" INTEGER NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id_medico")
);

-- CreateTable
CREATE TABLE "Especialidad" (
    "id_especialidad" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Especialidad_pkey" PRIMARY KEY ("id_especialidad")
);

-- CreateTable
CREATE TABLE "Cita" (
    "id_cita" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL,
    "CI_paciente" INTEGER NOT NULL,
    "id_medico" INTEGER NOT NULL,
    "estado" "EstadoCita" NOT NULL DEFAULT 'PROGRAMADA',

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("id_cita")
);

-- AddForeignKey
ALTER TABLE "Medico" ADD CONSTRAINT "Medico_id_especialidad_fkey" FOREIGN KEY ("id_especialidad") REFERENCES "Especialidad"("id_especialidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_CI_paciente_fkey" FOREIGN KEY ("CI_paciente") REFERENCES "Paciente"("CI") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "Medico"("id_medico") ON DELETE RESTRICT ON UPDATE CASCADE;
