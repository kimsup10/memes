var express = require('express');
var Attachment = require('../models/attachments.js');
var Meme = require('../models/memes.js');
var m = require('../models/models');
var redisClient = require('../utils/redis');

var router = express.Router();

router.post('/', function (req, res) {
    var key = 'attach#'+req.body.attachmentId;
    m.Meme.findOne({
        where:{
            privacy_level:'public',
            attachment_id:req.body.attachmentId
        }
    }).then(function (m) {
        if (!m) {
            res.send(200);
            return;
        }
        redisClient.hincrby(key, 'copy_count', 1, function (err, reply) {
            if (err) res.send(500);
            else{
                redisClient.hgetall(key, function (err, obj) {
                    if (err) res.send(500);
                    else{
                        trendingRank(key, obj);
                    }
                });
                res.send(200);
            }
        });
    });
});

function trendingRank(key, hash) {
    // Set seconds_score
    if (hash.seconds_score){
        var seconds_score = hash.seconds_score;
    } else{
        var seconds_score = Math.round(new Date().getTime()/(1000*45000));
        redisClient.hset(key, 'seconds_score', seconds_score)
    }
    var count_score = Math.log10(hash.copy_count);
    var score = Number(count_score) + Number(seconds_score);
    var member = key.split('#')[1];
    redisClient.zadd('trending', score, member);
}


module.exports = router;

