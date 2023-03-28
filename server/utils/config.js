require('dotenv').config();

const {
  CLIENT_PORT,
  SERVER_PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

module.exports = {
  CLIENT_PORT,
  SERVER_PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
};
