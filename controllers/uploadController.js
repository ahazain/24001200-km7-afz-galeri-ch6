const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imageKit = require("../libs/imageKit");

class Upload {
  static async addFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      console.log("Received file:", req.file);

      const stringImage = req.file.buffer.toString("base64");
      const uploadImage = await imageKit.upload({
        fileName: req.file.originalname,
        file: stringImage,
      });

      console.log("Image uploaded to ImageKit:", uploadImage);
      const addData = await prisma.fileUpload.create({
        data: {
          judul: req.body.judul,
          deskripsi: req.body.deskripsi,
          urlGambar: uploadImage.url,
        },
      });

      return res.status(201).json({
        status: 201,
        message: "Successfully added uploaded file",
        data: addData,
      });
    } catch (error) {
      console.error("Error in addFile method:", error);
      return res.status(500).json({
        status: 500,
        message: "Failed to add uploaded file",
        error: error.message,
      });
    }
  }
}

module.exports = Upload;
