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

  const sanitizeString = str => {
    str = str.replace(/[^a-z0-9\.,_-]/gim, '');
    sanatizedStr = str.toLowerCase();
    return sanatizedStr.trim();
  };

  sanitizeString(file.name);
  file.name = sanatizedStr;

  file.name =
    file.name.substring(0, file.name.lastIndexOf('.')) +
    Math.floor(Math.random() * 100000 + 1).toString() +
    file.name.substring(file.name.lastIndexOf('.'));

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error();
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => console.log('Server started on port 5000...'));
