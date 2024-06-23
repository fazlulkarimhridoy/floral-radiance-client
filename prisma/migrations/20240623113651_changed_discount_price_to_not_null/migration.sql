/*
  Warnings:

  - Made the column `discount_price` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `discount_price` INTEGER NOT NULL;
