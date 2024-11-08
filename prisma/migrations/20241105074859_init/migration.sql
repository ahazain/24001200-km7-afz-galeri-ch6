-- CreateTable
CREATE TABLE "fileUpload" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "urlGambar" TEXT NOT NULL,

    CONSTRAINT "fileUpload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fileUpload_urlGambar_key" ON "fileUpload"("urlGambar");
