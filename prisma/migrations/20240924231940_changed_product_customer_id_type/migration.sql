/*
  Warnings:

  - You are about to drop the column `customer_id` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Customer_customer_id_key` ON `customer`;

-- DropIndex
DROP INDEX `Product_product_id_key` ON `product`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `customer_id`,
    ADD COLUMN `customerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `product_id`,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_customerId_key` ON `Customer`(`customerId`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_productId_key` ON `Product`(`productId`);
