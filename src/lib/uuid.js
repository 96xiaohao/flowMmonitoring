// 'use strict'

const util = require('util')
const assert = require('http-assert')


function UUID () {}

UUID.name = 'UUID'
UUID.anyRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

UUID.isValid = function (str) {
    return UUID.anyRegex.test(str)
}


module.exports = UUID
