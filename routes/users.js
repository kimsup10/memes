var express = require('express');
var router = express.Router();
var User = require('../models/users.js');

// TODO: user page
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function(req, res, next){
    User.findOne({
        where:{
            username: req.body["username"],
            password: req.body["password"]
        }
    }).then(function(user) {
        if(user) {
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


module.exports = router;
