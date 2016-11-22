var express = require('express');
var Attachment = require('../models/attachments.js');
var Meme = require('../models/memes.js');
var upload = require('../utils/multer');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('imgUpload');
});

router.post('/', upload.array('image'), function (req, res) {
    var attachments = req.files.map(function (f) {
        return {
            filesize: f.size,
            filepath: f.path
        };
    });
    Attachment.bulkCreate(attachments, {returning: true}).then(function (a) {
            var memes = [];
            for (var i in a) {
                memes.push(
                    {
                        user_id: 1,
                        attachment_id: a[i].id,
                        description: req.body.description[i]
                    }
                );
            }
            Meme.bulkCreate(memes).then(function () {
                res.redirect('/');
            });
        }
    );
});

module.exports = router;
