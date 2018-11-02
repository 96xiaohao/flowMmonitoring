'use strict'
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const errorTrace = require('./middleware/error-trace')
const router = require('./routes')
const Koa = require('koa')
const cors = require('kcors')
const config = require('./config')

const app = new Koa()

app.use(cors())
app.use(logger())
app.use(errorTrace())
app.use(bodyParser({
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422)
    }
}))
app.use(router.routes())

app.listen(config.port)
console.log('app started on port ' + config.port)

module.exports = app // exports for test