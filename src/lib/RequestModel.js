'use strict'

const util = require('util')
const assert = require('http-assert')
const UUID = require('../lib/uuid')


class RequestModel {
    static transform(request, schema) {
        let result = {}
        for (let key in schema) {
            let scm = schema[key]
            let value = request[key]
            let valueType = util.isArray(value) ? 'array' : typeof value // diff array&object
            let scmType = util.isArray(scm) ? 'array' : typeof scm
            switch (scmType) {
                case 'function':
                    if (value || value != undefined) {
                        RequestModel.typeCheck(key, value, scm)
                        result[key] = value
                    }
                    break
                case 'object':
                    for (let k in scm) {
                        switch (k) {
                            case 'type':
                                if (value || value != undefined) {
                                    RequestModel.typeCheck(key, value, scm[k])
                                    result[key] = value
                                }
                                break
                            case 'required':
                                assert(value != undefined, 400, `${key} required`)
                                break
                            case 'enum':
                                if (scm.required || value) {
                                    assert(scm[k].includes(value), 400, `无效的 ${key} 值`)
                                }
                                break
                            case 'match':
                                if (valueType === 'string') {
                                    key = key === 'password' ? '密码' : key
                                    assert(scm[k].test(value), 400, `无效的 ${key} 格式`)
                                }
                                break
                            default:
                                value = value || {} // garentee filter schema can run independent
                                result[key] = RequestModel.transform(value, scm)
                        }
                    }
                    break
                case 'array':
                    if (!value) break // 如果key为数组并且输入没有该字段，则忽略该数组内部元素的检查
                    assert(util.isArray(value), 400, `${key} should be an array value`)
                    value.forEach((item, i) => {
                        result[key] = result[key] || []
                        result[key][i] = typeof scm[0] === 'object' ?
                            RequestModel.transform(item, scm[0]) :
                            RequestModel.typeCheck(key, item, scm[0])
                    })

                    break
                default:
                    assert(false, 400, 'invalid request schema')
            }
        }
        return result
    }

    static typeCheck(key, value, type) {
        if (type.name == 'UUID') {
            assert(UUID.isValid(value), 400, `无效的 ${key} type`)
        }
        else if (type.name == 'Array') {
            assert(util.isArray(value), 400, `${key} value is not array type`)
        }
        else {
            assert.equal(typeof value, type.name.toLowerCase(), 400, `无效的 ${key} type`)
        }
    }
}

module.exports = RequestModel
