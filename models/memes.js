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
    underscored: true,
    instanceMethods: {
    }
});

Meme.getListOfUser = function (user_id, privacy_level, cb) {
    Meme.findAll({
        limit: 10,
        include: [Meme.associations.attachment, Meme.associations.user],
        where: {
            user_id:user_id,
            privacy_level: {$lte: privacy_level}
        }
    }).then(cb);
};

module.exports = Meme;
