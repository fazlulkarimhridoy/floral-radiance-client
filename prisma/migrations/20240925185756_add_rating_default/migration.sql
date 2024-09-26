/*
  Warnings:

  - Made the column `stock` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `stock` INTEGER NOT NULL DEFAULT 0,
    MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `rating` INTEGER NOT NULL DEFAULT 0;
