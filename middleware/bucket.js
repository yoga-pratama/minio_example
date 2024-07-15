const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const bucket = "dev-multer-s3-bucket"

const s3 = new AWS.S3({
  endpoint: "http://192.168.202.118:91",
  accessKeyId: "kDtv55vUp1VCyU1xs3m6",
  secretAccessKey: "fGMVisBzI6GVy4Q0hSxj80lKguLKHbC2YxbCIltY",
  sslEnabled: false,
  s3ForcePathStyle: true,
});

const storage = multerS3({
  s3,
  bucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, Date.now().toString());
  },
});

exports.upload = multer({ storage });
exports.s3 = s3;
exports.bucket = bucket;