const pg = require('pg');

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'users',
    port: 5432,
};

const client = new pg.Client(config);

module.exports = client;