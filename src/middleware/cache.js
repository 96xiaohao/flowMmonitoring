'use strict'

const client = require('../db/redis')
const jwtDecode = require('jwt-decode')


module.exports = function cache(opt) {
    return async function (ctx, next) {
        if (process.env.NODE_ENV == 'development') return await next()

        let key = ctx.url
        if (opt && opt.useSession) {
            const {id: userId} = jwtDecode(ctx.headers['authorization'])
            ctx.assert(userId, 401, 'cache need authorization header!')
            key = key +':'+ userId
        }

        const result = await client.get(key)
        if (result) {
            ctx.body = JSON.parse(result)
            return
        }

        await next()
        await client.set(key, JSON.stringify(ctx.body))

        // opt.expire 单位(秒)
        if (opt && opt.expire) {
            client.expire(key, opt.expire)
        }

    }
}