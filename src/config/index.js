const development = {
    db: {
        user: 'postgres', //env var: PGUSER
        database: 'class_supervision', //env var: PGDATABASE
        password: 'Yangcong345', //env var: PGPASSWORD
        host: '10.8.8.8', // Server hosting the postgres database
        port: 5432, //env var: PGPORT
        max: 100, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    },
    port: process.env.NODE_PORT || 3090,
    cb: {
        host: 'http://10.8.8.8:3000'
    },
    host: {
        onion: 'http://10.8.8.8:5000',
        user: 'http://10.8.8.8:10020'
    },
    redis: {
        port: 6379,
        host: 'redis-test.yc345.tv',
        password: 'Yangcong345',
        db: 1,
        keyPrefix: 'supervision:',
    },
}
module.exports = development;