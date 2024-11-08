const express = require("express");
const route = express.Router();
const Upload = require("../controllers/uploadController");
const multerCloud = require("../libs/multer");

// route.get("/", controller);
// route.get("");
route.post("/upload", multerCloud.single("file"), Upload.addFile);
// route.put("/");
// route.delete("/");

module.exports = route;
