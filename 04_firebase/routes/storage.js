var express = require('express');
var router = express.Router();
const firebaseAdmin = require('../Modules/firebase');
const multer = require("multer"); // For upload file

// 设置存储桶
// const bucket = firebaseAdmin.storage().bucket();

const upload = multer({
    limits: {
        fileSize: 16 * 1024 * 1024, // 15MB
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// router.post('/upload', upload.single("file"), function (req, res) {
//     try {
//         const file = req.file;
    
//         if (!file) {
//           return res.status(400).send('No file uploaded.');
//         }
    
//         // 创建文件在存储桶中的路径和文件名
//         const filename = `${Date.now()}-${file.originalname}`;
    
//         // 上传文件到 Firebase Storage
//         const fileUpload = bucket.file(filename);
//         const stream = fileUpload.createWriteStream({
//           metadata: {
//             contentType: file.mimetype,
//           },
//           resumable: false,
//         });
    
//         stream.on('error', (error) => {
//           console.error(error);
//           return res.status(500).send('Upload failed');
//         });
    
//         stream.on('finish', () => {
//           // 文件上传成功
//           const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
//           return res.status(200).json({ url: publicUrl });
//         });
    
//         stream.end(file.buffer);
//       } catch (error) {
//         console.error(error);
//         return res.status(500).send('Internal Server Error');
//       }    
// });

module.exports = router;