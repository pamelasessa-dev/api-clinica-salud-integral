/*
  Warnings:

  - A unique constraint covering the columns `[CI_paciente,fecha_hora]` on the table `citas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "citas_CI_paciente_fecha_hora_key" ON "citas"("CI_paciente", "fecha_hora");
