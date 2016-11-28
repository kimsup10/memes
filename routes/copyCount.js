var express = require('express');
var Attachment = require('../models/attachments.js');
var Meme = require('../models/memes.js');
var redis = require('redis');
var redisClient = redis.createClient();

var router = express.Router();

router.post('/', function (req, res) {
    redisClient.zincrby("copy_count", 1, req.body.attachmentId, function (err, reply) {
        if (err) res.send(500);
        else{
            console.log(reply.toString());
            res.send(200);
        }
    });
});


module.exports = router;