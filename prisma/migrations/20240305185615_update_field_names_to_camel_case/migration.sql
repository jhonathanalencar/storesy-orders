-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_discount_id_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `discount_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `discount`(`discount_id`) ON DELETE SET NULL ON UPDATE CASCADE;
