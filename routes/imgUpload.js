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
    for ( var i in req.files ) {
      Attachment.build(
        {
          filesize: req.files[i].size,
          filepath: req.files[i].path
        }
      ).save();
    }
    res.redirect('back');
});

module.exports = router;
