/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `pacientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pacientes" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_email_key" ON "pacientes"("email");
