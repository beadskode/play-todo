/*
  Warnings:

  - You are about to drop the `Ranking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ranking` DROP FOREIGN KEY `fk_Ranking_member`;

-- AlterTable
ALTER TABLE `Member` ADD COLUMN `score` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `Ranking`;
