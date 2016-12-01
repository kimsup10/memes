var express = require('express');
var Attachment = require('../models/attachments.js');
var Meme = require('../models/memes.js');
var redisClient = require('../utils/redis');

var router = express.Router();

router.post('/', function (req, res) {
    var key = 'attach#'+req.body.attachmentId;
    redisClient.hincrby(key, 'copy_count', 1, function (err, reply) {
        if (err) res.send(500);
        else{
            redisClient.hgetall(key, function (err, obj) {
                if (err) res.send(500);
                else{
                    trendingRank(key, obj);
                }
            });
            console.log(reply.toString());
            res.send(200);
        }
    });
});



function trendingRank(member, hash) {
    // Set seconds_score
    if (hash.seconds_score){
        var seconds_score = hash.seconds_score;
    } else{
        var seconds_score = Math.round(new Date().getTime()/(1000*45000));
        redisClient.hset(key, 'seconds_score', seconds_score)
    }
    var count_score = Math.log10(hash.copy_count);

    var score = Number(count_score) + Number(seconds_score);

    console.log(count_score, seconds_score, score);
    redisClient.zadd('trending', score, member);
}


module.exports = router;

