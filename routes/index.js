var express = require('express');
var imgUpload = require('./imgUpload');
var copyCount = require('./copyCount');
var users = require('./users');
var trending = require('./trending');
var m = require('../models/models.js');

module.exports = function (app) {
    app.use('/user', users);
    app.use('/upload', imgUpload);
    app.use('/count', copyCount);
    app.use('/trending', trending);

    app.get('/', function(req, res, next) {
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
                    limit: 10,
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
        }
        else{
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
};
