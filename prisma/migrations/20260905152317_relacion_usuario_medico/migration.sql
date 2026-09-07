/*
  Warnings:

  - A unique constraint covering the columns `[id_usuario]` on the table `medicos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_usuario` to the `medicos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicos" ADD COLUMN     "id_usuario" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "medicos_id_usuario_key" ON "medicos"("id_usuario");

-- AddForeignKey
ALTER TABLE "medicos" ADD CONSTRAINT "medicos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
