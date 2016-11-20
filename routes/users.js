var express = require('express');
var router = express.Router();
var User = require('../models/users.js');

// TODO: user page
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



router.post('/login', function(req, res, next){

    User.findAll({
        where:{
            username: req.body["username"],
            password: req.body["password"]
        }
    }).then(function(users) {
        console.log(users);
        res.redirect('/');
    });

    //-res.render('login');
});


module.exports = router;
