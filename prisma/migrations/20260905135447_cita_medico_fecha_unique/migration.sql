/*
  Warnings:

  - A unique constraint covering the columns `[id_medico,fecha_hora]` on the table `citas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `especialidades` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "citas_id_medico_fecha_hora_key" ON "citas"("id_medico", "fecha_hora");

-- CreateIndex
CREATE UNIQUE INDEX "especialidades_nombre_key" ON "especialidades"("nombre");
