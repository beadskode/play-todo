/*
  Warnings:

  - Made the column `parentId` on table `Todos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Todos` MODIFY `parentId` INTEGER NOT NULL DEFAULT 0;
