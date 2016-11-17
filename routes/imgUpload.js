var express = require('express');
var multer = require('multer');
var db_client = require('..utils/database.js');

// TODO: Storage Handling Service 분리
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});
var router = express.Router();

router.get('/', function (req, res) {
    res.render('imgUpload');
});

router.post('/', upload.array('image'), function (req, res) {
    // TODO : add desciptoin and tags in insert query
    for ( var i in req.files ) {
        query = db_client.query(
            'INSERT INTO attachments(filesize, filepath) values ($1, $2)',
            [req.files[i].size, req.files[i].path]
        );
    }
    res.redirect('back');
});

module.exports = router;
