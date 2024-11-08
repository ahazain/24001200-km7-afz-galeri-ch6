const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imageKit = require("../libs/imageKit");

class Upload {
  static async showFile(req, res) {
    try {
      const showData = await prisma.fileUpload.findMany({
        include: { image: true },
      });
      res.status(200).json({
        status: 200,
        message: "successul show list upload file",
        data: showData,
      });
    } catch (error) {
      console.log(error, "=====INI ERROR GUYS");
      res.status(500).json("ERROR SERVER");
    }
  }
  static async showDetailsFile(req, res) {
    try {
      const showDataId = await prisma.fileUpload.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { image: true },
      });
      res.status(200).json({
        status: 200,
        message: "successul show details upload file",
        data: showDataId,
      });
    } catch (error) {
      console.log(error);
    }
  }

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
          image: {
            create: {
              urlGambar: uploadImage.url,
            },
          },
        },
        include: {
          image: true,
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
  static async updateFile(req, res) {
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

      const updatedFile = await prisma.fileUpload.update({
        where: { id: parseInt(req.params.id) },
        data: {
          judul: req.body.judul,
          deskripsi: req.body.deskripsi,
          image: {
            update: {
              urlGambar: uploadImage.url,
            },
          },
        },
        include: {
          image: true,
        },
      });
      return res.status(200).json({
        status: 200,
        message: "Successfully updated file",
        data: updatedFile,
      });
    } catch (error) {
      console.error("Error in updateFile method:", error);
      return res.status(500).json({
        status: 500,
        message: "Failed to update file",
        error: error.message,
      });
    }
  }

  static async DeleteFile(req, res) {
    const id = parseInt(req.params.id);
    console.log("Received fileUpload ID:", id);

    try {
      const fileUploadExists = await prisma.fileUpload.findUnique({
        where: { id },
        include: { image: true },
      });

      if (!fileUploadExists) {
        return res.status(404).json({
          status: 404,
          message: `FileUpload with ID ${id} not found`,
        });
      }

      const result = await prisma.$transaction([
        prisma.fileUpload.delete({
          where: { id },
        }),
      ]);

      res.status(200).json({
        status: 200,
        message: "Successfully deleted fileUpload and its associated image",
        data: result,
      });
    } catch (error) {
      console.error(error, "Error while deleting fileUpload and image");
      return res.status(500).json({
        status: 500,
        message: "Failed to delete fileUpload and associated image",
        error: error.message,
      });
    }
  }
}

module.exports = Upload;
