var express = require('express');
var m = require('../models/models.js');
var upload = require('../utils/multer');

var router = express.Router();

router.get('/', function (req, res) {
    if (req.session.user_id){
        res.render('imgUpload');
    } else
        res.redirect('/');

});

router.post('/', upload.array('image'), function (req, res) {
    var attachments = req.files.map(function (f) {
        return {
            filesize: f.size,
            filepath: f.filename
        };
    });
    if (attachments.length==1){
        m.Attachment.create(attachments[0]).then(function (a) {
            meme = {
                user_id: req.session.user_id,
                attachment_id: a.id,
                description: req.body.description,
                privacy_level:req.body.privacy_level
            }
            m.Meme.create(meme).then(function () {
                res.redirect('/');
            })
        })
    } else {
        m.Attachment.bulkCreate(attachments, {returning: true}).then(function (a) {
                var memes = [];
                for (var i in a) {
                    memes.push(
                        {
                            user_id: req.session.user_id,
                            attachment_id: a[i].id,
                            description: req.body.description[i],
                            privacy_level: req.body.privacy_level[i]
                        }
                    );
                }
                m.Meme.bulkCreate(memes).then(function () {
                    res.redirect('/');
                });
            }
        )};
});



module.exports = router;
