const multer = require("multer");
/* const multerS3 = require("multer-s3"); */
const minio = require('minio');
const bucket = process.env.MINIO_BUCKET;
const upload = multer();

const minioClient = new minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT, 10),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
})


const uploadFile = async (req, res, next) => {
    const file = req.file;
    //console.log(process.env.MINIO_ACCESS_KEY);
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, buffer } = file;

    try {


        // get date format yyyy-mm-dd
        const currentDate = new Date().toISOString().split('T')[0];
        const filePath = `${currentDate}/${originalname}`;

        await minioClient.putObject(bucket, filePath, buffer);
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not upload file" });
    }
}

const getFile = async (req, res, next) => {
    const { filename } = req.params;
    try {
        const stream = await minioClient.getObject(bucket, filename);
        stream.pipe(res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not get file" });
    }
}

exports.uploadFile = uploadFile;
exports.getFile = getFile;