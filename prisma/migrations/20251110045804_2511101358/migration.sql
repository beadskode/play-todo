-- CreateTable
CREATE TABLE `Member` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `nickname` VARCHAR(21) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `pw` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `description` VARCHAR(512) NULL,
    `emailcheck` VARCHAR(256) NULL,
    `outdt` VARCHAR(10) NULL,

    UNIQUE INDEX `uniq_Member_email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ranking` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `member` INTEGER UNSIGNED NULL,
    `score` INTEGER NOT NULL DEFAULT 1,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_Ranking_member`(`member`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Todos` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `member` INTEGER UNSIGNED NOT NULL,
    `todo` VARCHAR(255) NULL,
    `parentId` INTEGER NULL,
    `isFinished` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_Todo_member`(`member`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ranking` ADD CONSTRAINT `fk_Ranking_member` FOREIGN KEY (`member`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todos` ADD CONSTRAINT `fk_Todo_member` FOREIGN KEY (`member`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
