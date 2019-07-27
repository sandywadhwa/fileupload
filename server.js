const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/uploads')
    },
    filename: function(req, file, cb) {
        var parsedFileName = path.parse(file.originalname);
        cb(null, parsedFileName.name + '-' + Date.now() + parsedFileName.ext);
    }
});


var upload = multer({ storage: storage })

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/view/index.html'))

app.post('/profile', upload.single('avatar'), function(req, res, next) {
    // req.file is the `avatar` file
    res.json({ 'file': req.file });
});

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))