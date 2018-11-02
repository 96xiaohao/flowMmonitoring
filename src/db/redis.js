const Redis = require('ioredis')
const {host, port, password, db, keyPrefix} = require('./config').redis

// const MAX_ATTEMPT = 3

// let attempt = 0

// function retryStrategy (times) {
//     attempt++
//     if (attempt > MAX_ATTEMPT) return null
//     return Math.max(times * 2, 2000)
// }

const client = new Redis({
    port,
    host,
    password,
    db,
    keyPrefix,
    // retryStrategy,
    dropBufferSupport: true
})

client.on('connect', function () {
    console.log('redis connect successfully')
})

client.on('err', function (err) {
    console.error(err)
})

module.exports = client