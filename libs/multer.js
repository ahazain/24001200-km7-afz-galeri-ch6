const multer = require("multer");

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/mpeg",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Terima file
  } else {
    cb(new Error("Only images and videos are allowed"), false); // Tolak file
  }
};
const multerCloud = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = multerCloud;
