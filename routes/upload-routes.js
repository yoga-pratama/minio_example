const express = require("express");
const multer = require("multer");
const minioUpload = require("../middleware/minio_bucket");

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single('file'), minioUpload.uploadFile, (req, res) => {
    res.status(200).json({ message: "File uploaded successfully" });
});

router.get('/get-file/:filename', minioUpload.getFile);

module.exports = router;