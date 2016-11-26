var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var db = require('../utils/database.js');

var Friend = db.define('friends', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    friend_id: Sequelize.INTEGER,
    accepted_at: Sequelize.TIME
}, {
    underscored: true
});

module.exports = Friend;
