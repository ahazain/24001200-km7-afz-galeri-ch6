const express = require("express");
const route = express.Router();
const Upload = require("../controllers/uploadController");
const multerCloud = require("../libs/multer");

route.get("/file", Upload.showFile);
route.get("/file/:id", Upload.showDetailsFile);
route.post("/upload-file", multerCloud.single("file"), Upload.addFile);
route.put("/update-file/:id", multerCloud.single("file"), Upload.updateFile);
route.delete("/file/:id", Upload.DeleteFile);

module.exports = route;
