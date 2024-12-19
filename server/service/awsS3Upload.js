const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1', 
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME, 
        acl: 'public-read', 
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `resumes/${Date.now()}-${file.originalname}`);
        }
    }),
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

const uploadPDFToS3 = (req) => {
    return new Promise((resolve, reject) => {
        upload.single('resume')(req, null, (error) => {
            if (error) {
                reject(error);
            } else {
                const fileUrl = req.file.location;
                resolve(fileUrl);
            }
        });
    });
};

module.exports = { uploadPDFToS3 };
