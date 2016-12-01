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


            getRankedAttachments(attachmentIds, function (attachments) {
                res.render('trend', { attachments: attachments, hostname:req.headers.host });
            });
        }
    });
});

function getRankedAttachments(attachmentIds, cb) {
    m.Attachment.findAll({
        where: {
            id:{ $in : attachmentIds }
        }
    }).then(function (attachments) {
        var sortedAttachments = [];
        for ( var i in attachmentIds ){
            var target = attachmentIds[i];
            for ( var j in attachments ){
                if (target == attachments[j].id){
                    sortedAttachments[i]=attachments[j];
                    attachments.splice(j, 1);
                }
            }
        }
        cb(sortedAttachments);
    });
}

module.exports = router;