const config = require('./utils/config');
const redis = require('redis');

const redisClient = redis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  // password: config.REDIS_PASSWORD,
});

const start = async () => {
  await redisClient.connect();
};
start();

redisClient.on('connect', () => {
  console.log('Successfully connected to Redis');
});

redisClient.on('error', (error) => {
  console.error(error);
});

module.exports = {
  redisClient,
};
