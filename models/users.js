var Sequelize = require('sequelize');
var db = require('../utils/database.js');

var User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
}, {
  tableName: 'users',
  underscored: true,
  instanceMethods: {
  }
});

module.exports = User;
