var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var db = require('../utils/database.js');

var User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    set: function(val) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(val, salt);
      this.setDataValue('password', hash);
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {isEmail: true}
  }
}, {
  tableName: 'users',
  underscored: true,
  instanceMethods: {
    authenticate: function(value) {
      if (bcrypt.compareSync(value, this.password))
        return this;
      else
        return false;
    }
  },
});

module.exports = User;
