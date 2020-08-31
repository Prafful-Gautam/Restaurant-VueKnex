const knex = require('knex');
var config = require('../knexfile.js')['development'];
console.log(config);
module.exports = knex(config);