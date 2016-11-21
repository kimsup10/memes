var express = require('express');
var multer = require('multer');
var Attachment = require('../models/attachments.js');

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
    attachments = req.files.map(function(f){
        return {
            filesize: f.size,
            filepath: f.path
        };
    });
    Attachment.bulkCreate(attachments).then(function() {
        res.redirect('back');
    });
});

module.exports = router;
