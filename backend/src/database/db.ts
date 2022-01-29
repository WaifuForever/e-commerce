import knex from 'knex';
const { config } = require('../config/knex.config');

const db = knex(config[process.env.NODE_ENV || 'dev']);

export default db;
