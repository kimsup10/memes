var express = require('express');
var router = express.Router();
var m = require('../models/models.js')

// TODO: user page
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function(req, res, next){
    m.User.findOne({
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
    m.User.create({
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


router.get('/friends', function(req, res, next) {
    m.Friend.findAll({
        where: {user_id: req.session.user_id},
        include: [m.Friend.associations.friend_user]
    }).then(function(friends){
        res.render('friend', {friends: friends});
    });
});

router.post('/friends', function(req, res, next) {
  if('username' in req.body) {
    m.User.findOne({where: {username: req.body["username"]}}).then(function(friend_user){
      m.Friend.bulkCreate([
        {user_id: req.session.user_id, friend_id: friend_user.id, status: 'waiting'},
        {user_id: friend_user.id, friend_id: req.session.user_id, status: 'request'},
      ]).then(function(requests) {
          res.redirect('back');
      }).catch(function(error) {
          res.redirect('back');
      });
    }).catch(function(error) {
        res.redirect('back');
    });
  } else {
    m.Friend.update({status: req.body['action']}, {
      where: {$or: [
        {user_id: req.session.user_id, friend_id: req.body["user_id"]},
        {user_id: req.body["user_id"], friend_id: req.session.user_id}
      ]}
    }).then(function(request) {
      res.redirect('back');
    });
  }
});

router.get('/profile', function(req,res,next){
    res.render('signup');
});
module.exports = router;
