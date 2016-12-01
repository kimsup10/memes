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
    redisClient.zrevrange('trending', 0, trendNum-1, function (err, attachmentNames) {
        if (err) res.send(500);
        else {

            var attachments = [];
            var attachmentIds = attachmentNames.map(function (a) {
                return a.split('#')[1];
            });
            console.log(attachmentIds);
            getRankedAttachments(0, attachmentIds, [], function (attachments) {
                res.render('trend', { attachments: attachments, hostname:req.headers.host });
            });
        }
    });
});

function getRankedAttachments(index, attachmentIds, attachments, cb) {
    if (index == attachmentIds.length){
        cb(attachments);
        return;
    }
    m.Attachment.findOne({
        where: {
            id:attachmentIds[index++]
        }
    }).then(function (a) {
        attachments.push(a);
        getRankedAttachments(index, attachmentIds, attachments, cb);

    });
}

module.exports = router;