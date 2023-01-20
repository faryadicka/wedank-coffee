const redis = require('redis')
const { REDIS_URL } = process.env

const client = redis.createClient({
  url: REDIS_URL,
})

client.on('pending', function () {
  console.log('Redis Client Pending!');
});

client.on('connect', function () {
  console.log('Redis Client Connected!');
});

client.on('error', (err: any) => {
  console.log('Redis Client Error : ' + err)
})

module.exports = client