/*
  Warnings:

  - Added the required column `desc` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Upload" ADD COLUMN     "desc" TEXT NOT NULL;
