
var Sequelize = require('sequelize');
var db = require('../utils/database.js');

var Meme = db.define('meme', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    description: Sequelize.STRING,
    attachment_id: Sequelize.INTEGER,
    privacy_level: {
        type: Sequelize.ENUM('public', 'friends', 'private'),
        defaultValue: 'public'
    }
}, {
    tableName: 'memes',
    underscored: true,
    instanceMethods: {
    }
});

module.exports = Meme;
