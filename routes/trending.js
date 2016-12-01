var express = require('express');
var m = require('../models/models');
var redis = require('../utils/redis');

var router = express.Router();

const pageLimit = 20;

router.get('/', function (req, res, next) {
    redis.zrevrange('trending', 0, pageLimit-1, function (err, memeIds) {
        if (err) {
            res.send(500);
        } else {
            m.Meme.findAll({
                where: { id:{ $in : memeIds } },
                include: [m.Meme.associations.attachment, m.Meme.associations.user],
            }).then(function (memes) {
                var sortedMemes = memeIds.map(function(id) {
                    var i = memes.findIndex(function(meme){
                        return meme.id == id;
                    });
                    return memes.splice(i, 1).pop();
                });
                res.render('index', { memes: sortedMemes });
            });
        }
    });
});

module.exports = router;
