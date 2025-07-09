// No need to change this file
const knex = require('knex');

// What knex configuration is actually used?
const configurations = require('../knexfile.js');

// That depends on the value of process.env.NODE_ENV!
const environment = process.env.NODE_ENV || 'development';

//export module
module.exports = knex(configurations[environment]);
