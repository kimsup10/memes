var express = require('express');
var m = require('../models/models');
var redis = require('../utils/redis');

var router = express.Router();

router.post('/', function (req, res) {
    var key = 'meme:'+req.body.memeId;
    m.Meme.findOne({
        where: {
            id: req.body.memeId,
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

module.exports = router;
