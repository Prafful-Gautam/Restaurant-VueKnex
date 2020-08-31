const knex = require('./db');

module.exports = {
    restaurant: {
        getAll: () => {
            knex('restaurant')
        }
    }
}
