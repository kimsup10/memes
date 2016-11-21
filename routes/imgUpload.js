
var express = require('express');
var Attachment = require('../models/attachments.js');
var Meme = require('../models/memes.js');
var upload = require('../utils/multer');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('imgUpload');
});

router.post('/submit', upload.array('image'), function (req, res) {
    for ( var i in req.files ) {
        Attachment.create(
            {
                filesize: req.files[i].size,
                filepath: req.files[i].path
            }
        ).then(function (a) {
            Meme.create({
                user_id:1,
                description:req.body.description[i],
                attachment_id: a.id
            })
        });
    }
    // TODO: Asynchronous programming issues
    res.redirect('back');
});

module.exports = router;
