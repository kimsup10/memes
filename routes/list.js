var express = require('express');
var router = express.Router();
var m = require('../models/models.js');
var redis = require('../utils/redis');
var es = require('../utils/elasticsearch.js');

const pageLimit = 20;

router.get('/', function(req, res, next) {
    if(req.session.user_id) {
        m.Friend.findAll({
            attributes: ['friend_id'],
            where: {
                user_id: req.session.user_id, status: "accepted"
            }
        }).then(function (friends) {
            friends_ids = friends.map(function(friend) { return friend.friend_id });
            friends_ids.push(req.session.user_id);
            m.Meme.findAll({
                limit: pageLimit,
                include: [m.Meme.associations.attachment, m.Meme.associations.user],
                where: {
                    $or: [
                        {privacy_level: 'public'},
                        {privacy_level: 'private', user_id: req.session.user_id},
                        {privacy_level: 'friends', user_id: {$in: friends_ids}}
                    ]
                }
            }).then(function (memes) {
                res.render('index', {memes: memes});
            });
        });
    } else{
        m.Meme.findAll({
            limit: 10,
            include: [m.Meme.associations.attachment, m.Meme.associations.user],
            where: {
                privacy_level: 'public'
            }
        }).then(function (memes) {
            res.render('index', {memes: memes});
        });
    }
});

router.get('/trending', function (req, res, next) {
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

router.get('/search', function(req, res, next) {
    es.search({
        index: 'meme',
        type: 'meme',
        body: {
            query: {
              match: {description: req.query.q}
            }, filter: {
              term: {privacy_level: 'public'}
            }
        }
    }, function(err, resp) {
        if (err) {
            res.send(500);
        } else {
            memes_id = resp.hits.hits.map(function(meme) {
                return meme._id;
            });
            m.Meme.findAll({
                limit: 10,
                include: [m.Meme.associations.attachment, m.Meme.associations.user],
                where: {
                    id: {$in: memes_id},
                    privacy_level: 'public'
                }
            }).then(function (memes) {
                res.render('index', {memes: memes});
            });
        }
    });
});

module.exports = router
