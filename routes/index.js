var express = require('express');
var imgUpload = require('./imgUpload');
var users = require('./users');

module.exports = function (app) {
    app.use('/user', users);
    app.use('/uploads', imgUpload);

    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Uplaod example' });
    });
}
