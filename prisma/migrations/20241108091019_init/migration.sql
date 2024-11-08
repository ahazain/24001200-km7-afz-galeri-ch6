-- DropForeignKey
ALTER TABLE "fileUpload" DROP CONSTRAINT "fileUpload_imageId_fkey";

-- AddForeignKey
ALTER TABLE "fileUpload" ADD CONSTRAINT "fileUpload_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
