'use strict'

const config = require('./config')
// const pg = require('pg').native
const pg = require('pg');
const pool = new pg.Pool(config.db)

// attach an error handler to the pool for when a connected, idle client
// receives an error by being disconnected, etc
pool.on('error', function(error, client) {
    console.error(error, client)
    console.info('Exit process')
    process.exit(1)
})

pool.on('connect', function() {
    console.log('db connected')
})

module.exports = pool