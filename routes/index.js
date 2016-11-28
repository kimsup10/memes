var express = require('express');
var imgUpload = require('./imgUpload');
var copyCount = require('./copyCount');
var users = require('./users');
var m = require('../models/models.js');

module.exports = function (app) {
    app.use('/user', users);
    app.use('/upload', imgUpload);
    app.use('/count', copyCount);

    app.get('/', function(req, res, next) {
        m.Meme.findAll({limit: 10, include: [
          m.Meme.associations.attachment, m.Meme.associations.user
        ]}).then(function(memes) {
            res.render('index', { memes: memes, hostname:req.headers.host });
        });
    });
};
