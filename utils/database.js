var pg = require('pg');
var connectionsString = process.env.DATABASE_URL || 'postgres://localhost:5432/meme';
var client = new pg.Client(connectionsString);

// TODO: Connection Pool 구현할것
client.connect();

module.exports = client;
