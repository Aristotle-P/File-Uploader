const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const uploadDir = '/client/public/uploads';

const app = express();

app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'Please upload a file' });
  }

  const file = req.files.file;
  const token = Math.floor(Math.random() * 100000 + 1);

  const sanitizeString = str => {
    str = str.replace(/[^a-z0-9\.,_-]/gim, '');
    res = str.toLowerCase();
    return res.trim();
  };

  sanitizeString(file.name);
  file.name = res;

  fs.readdir(uploadDir, (err, files) => {
    files.forEach(dirFile => {
      if (file.name === dirFile.name) {
        file.name += Math.floor(Math.random() * 100000 + 1);
        return file;
      }
    });
  });

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error();
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => console.log('Server started on port 5000...'));
