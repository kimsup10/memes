var express = require('express');
var Attachment = require('../models/attachments.js');
var Meme = require('../models/memes.js');
var m = require('../models/models');
var redisClient = require('../utils/redis');

var events = require('events');
var eventEmitter = new events();

var router = express.Router();

const trendNum = 5;

router.get('/', function (req, res, next) {
    redisClient.zrevrange('trending', 0, trendNum-1, function (err, attachmentIds) {
        if (err) res.send(500);
        else {

            var attachments = [];
            attachmentIds.map(function (a) {
                a_id = a.split('#')[1];
                m.Attachment.findOne({
                        where: {
                            id:a_id
                        }
                    }).then(function (a) {
                    attachments.push(a);
                    if (attachments.length==attachmentIds.length){
                        eventEmitter.emit('trending', res, attachments, req.headers.host);
                    }
                });
            });
        }
    });
});

eventEmitter.on('trending', function (res, attachments, hostname) {
    res.render('trend', {attachments:attachments, hostname:hostname});
});

module.exports = router;