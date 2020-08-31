var knex = require('knex');
const connection = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'admin',
        port: 3306
    },
    migrations: {
        directory: __dirname + 'migrations'
    },
    seeds: {
        directory: __dirname + 'seeds'
    }
});

module.exports = connection;