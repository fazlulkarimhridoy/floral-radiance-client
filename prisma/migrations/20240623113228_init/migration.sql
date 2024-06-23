-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` VARCHAR(255) NOT NULL,
    `images` LONGTEXT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `discount_price` INTEGER NULL,
    `description` LONGTEXT NULL,
    `rating` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Products_product_id_key`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
