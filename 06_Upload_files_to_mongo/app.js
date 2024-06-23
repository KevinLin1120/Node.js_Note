// app.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const File = require('./models/file.model');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/fileUpload', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// Multer configuration
// const storage = multer.memoryStorage(); // 將上傳的文件儲存在記體體中
// const upload = multer({ storage: storage }); // 配置 Middleware 指定存儲方式

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // upload temp storage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

/// Route for uploading a PDF file
// app.post('/upload', upload.single('pdf'), async (req, res) => {
/// Route for uploading multiple files(limit count)
// app.post('/upload', upload.array('files', 999), async (req, res) => {
/// Route for uploading files(any numbers)
app.post('/upload', upload.any('files'), async (req, res) => {
  try {
    /// Single file save
    // const { originalname, buffer, mimetype } = req.file;

    // const file = new File({
    //   name: originalname,
    //   data: buffer,
    //   contentType: mimetype,
    // });
    // await file.save();

    /// Multiple files save
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // console.log('Files received:', files);

    /// Single file
    // const filePromises = files.map(file => {
    //   const {originalname, buffer, mimetype} = file;

    //   const newFile = new File({
    //     name: originalname,
    //     data: buffer,
    //     contentType: mimetype
    //   });

    //   return newFile.save();
    // })

    /// Multiple files
    const filePromises = files.map(file => {
      const { path, originalname, mimetype } = file;

      return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
          if (err) {
            return reject(err);
          }

          const newFile = new File({
            name: originalname,
            path: path,
            contentType: mimetype,
          });

          newFile.save()
            .then(() => {
              resolve();
            })
            .catch(reject);
        });
      });
    });

    await Promise.all(filePromises);
    res.status(201).send('File uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading the file.');
  }
});


// Route to display a list of uploaded files
app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.send(files);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving files from the database.');
  }
});

// Route to display an individual file based on its ID
app.get('/files/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).send('File not found');
    }

    // Send the file data as a response
    // res.contentType(file.contentType);
    // res.send(file.data);
    res.sendFile(path.resolve(file.path))
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving the file from the database.');
  }
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
