var express = require('express');
var m = require('../models/models');
var upload = require('../utils/multer');
var redis = require('../utils/redis');

var router = express.Router();

router.post('/:id/copy', function (req, res) {
    var key = 'meme:'+req.params.id;
    m.Meme.findOne({
        where: {
            id: parseInt(req.params.id),
            privacy_level:'public'
        }
    }).then(function (meme) {
        if (!meme) {
            res.send(200);
        } else {
            redis.hincrby(key, 'copy_count', 1, function (err, reply) {
                if (err) {
                    res.send(500);
                } else {
                    redis.hgetall(key, function (err, hash) {
                        if (err) {
                            res.send(500);
                        } else {
                            var score = Math.log10(Number(hash.copy_count)) + Math.round(meme.created_at/(1000*45000));
                            redis.zadd('trending', score, meme.id);
                        }
                    });
                    res.send(200);
                }
            });
        }
    });
});


router.get('/new', function (req, res) {
    if (req.session.user_id){
        res.render('newMeme');
    } else {
        // No authorization
        req.flash('error', '로그인 하세요.');
        res.redirect('/')
    }
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
            };
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
                m.Meme.bulkCreate(memes, {returning: true}).then(function () {
                    res.redirect('/');
                });
            }
        )}
});


module.exports = router;

