/*
  Warnings:

  - You are about to drop the column `urlGambar` on the `fileUpload` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "fileUpload_urlGambar_key";

-- AlterTable
ALTER TABLE "fileUpload" DROP COLUMN "urlGambar";

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "fileUploadId" INTEGER NOT NULL,
    "urlGambar" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_fileUploadId_key" ON "image"("fileUploadId");

-- CreateIndex
CREATE UNIQUE INDEX "image_urlGambar_key" ON "image"("urlGambar");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_fileUploadId_fkey" FOREIGN KEY ("fileUploadId") REFERENCES "fileUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
