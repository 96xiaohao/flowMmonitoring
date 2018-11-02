'use strict'

module.exports = function errorTrace() {
    return async function(ctx,next) {
        try {
            await next()
        }
        catch (err) {
            if (err.status == 401 && ctx.header['client-type'] === 'android-app') { // for android use
                ctx.set('WWW-Authenticate', 'Basic realm="fake"')
            }


            ctx.body = {
                msg: ctx.body && ctx.body.msg || "",
                debug: err.message,
                type: ''
            }

            ctx.status = err.status || 500;

            if (ctx.status >= 500 || err.name === 'ValidationError') {
                console.error('request url: ', ctx.url)
                console.error('request header: ', ctx.header)
                console.error('request body: ', ctx.request.body)

            }

            ctx.app.emit('error', err, ctx)
        }
    }
}
