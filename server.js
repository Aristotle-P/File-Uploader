const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'Please upload a file' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/react/public/uploads/${file.name}`, err => {
    if (err) {
      console.error();
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => console.log('Server started on port 5000...'));
