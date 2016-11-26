var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var Friend = require('../models/friends.js');

// TODO: user page
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function(req, res, next){
    User.findOne({
        where:{ username: req.body["username"] }
    }).then(function(user) {
        if(user && user.authenticate(req.body["password"])) {
            req.session.user_id = user.id;
            req.session.username = user.username;
        }
        res.redirect('back');
    });
});

router.post('/logout', function(req, res, next){
    req.session.destroy();
    res.redirect('back');
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post('/signup', function(req, res, next) {
    User.create({
        username: req.body["username"],
        password: req.body["password"],
        email: req.body["email"]
    }).then(function(user) {
        req.session.user_id = user.id;
        req.session.username = user.username;
        res.redirect('/');
    }).catch(function(error) {
        res.redirect('back');
    });
});


router.get('/friends', function(req,res,next){
    Friend.findAll({

        where : {user_id : req.session.user_id}
    }).then(funciton(friends){

    });
    res.render('friend');
});

router.get('/profile', function(req,res,next){
    res.render('signup');
})
module.exports = router;
