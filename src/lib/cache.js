'use strict';

const client = require('../redis');

class Cache {
	static async set (ctx,key, data, expire) {

		await client.set(key, JSON.stringify(data))
			.catch(err => console.error(err));

		expire = expire || 86400 * 7;  //默认一周过期
		client.expire(key, expire);

	}

	static async get (ctx,key) {

		return null;

		const data =  await client.get(key)
			.catch(err => console.error(err));

		return JSON.parse(data);


	}
}


module.exports = Cache;
