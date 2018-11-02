'use strict'

const assert = require('http-assert')
const pool = require('../db')
const util = require('util')


class DBUtility {

    // 支持事务 client
    constructor(client) {
        this.db = client || pool
    }


    // json array to pg array
    static toArray(jsonArray) {
        let arrText = jsonArray.map(item => '$sql$'+ item +'$sql$').join()
        return util.format("ARRAY[%s]", arrText)
    }


    *insertMany(table, dataList) {
        let fields = []
        for (let key in dataList[0]) {
            fields.push(`"${key}"`) // 大小写
        }
        const fieldText = fields.join(',')

        // compose value list
        const dataText = dataList.map(function (data) {
            let v = []
            for (let key in data) {
                const _v = data[key]
                if (/^ARRAY\[.*|\n\r\]/i.test(_v)) { // TODO: 构建类型系统
                    v.push(_v)
                }
                else {
                    v.push(`'${_v}'`)
                }
            }
            return util.format('(%s)', v.join(','))
        })
        .join()

        const sql = util.format('INSERT INTO %s (%s) VALUES %s', table, fieldText, dataText)
        try {
            yield this.db.query(sql)
        }
        catch (e) {
            console.error('sql ', sql)
            throw e
        }
    }

}

module.exports = DBUtility
