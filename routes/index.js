var express = require('express');
var imgUpload = require('./imgUpload');
var users = require('./users');
var Attachment = require('../models/attachments.js');

module.exports = function (app) {
    app.use('/user', users);
    app.use('/uploads', imgUpload);

    app.get('/', function(req, res, next) {
        Attachment.findAll({limit: 10}).then(function(attachments) {
            res.render('index', { attachments: attachments });
        });
    });
}
