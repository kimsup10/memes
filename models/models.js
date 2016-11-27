var m = {};
m.Friend = require('../models/friends.js');
m.User = require('../models/users.js');

m.Friend.belongsTo(m.User);
m.Friend.belongsTo(m.User, {as: 'friend_user', foreignKey: 'friend_id'});
m.User.belongsToMany(m.User, {through: m.Friend, as: 'friends'});

module.exports = m;
