var express = require('express');
var Attachment = require('../models/attachments.js');
var upload = require('../utils/multer');

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
