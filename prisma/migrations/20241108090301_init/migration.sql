/*
  Warnings:

  - You are about to drop the column `fileUploadId` on the `image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `fileUpload` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `fileUpload` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_fileUploadId_fkey";

-- DropIndex
DROP INDEX "image_fileUploadId_key";

-- AlterTable
ALTER TABLE "fileUpload" ADD COLUMN     "imageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "image" DROP COLUMN "fileUploadId";

-- CreateIndex
CREATE UNIQUE INDEX "fileUpload_imageId_key" ON "fileUpload"("imageId");

-- AddForeignKey
ALTER TABLE "fileUpload" ADD CONSTRAINT "fileUpload_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
