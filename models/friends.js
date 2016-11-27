var Sequelize = require('sequelize');
var db = require('../utils/database.js');

var Friend = db.define('friend', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    friend_id: Sequelize.INTEGER,
    status: Sequelize.ENUM('waiting', 'request', 'decliend', 'accepted')
}, {
    underscored: true
});

module.exports = Friend;
