const config = require('../utils/config');
const { redisClient } = require('../store');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  redirectUri: `http://localhost:${config.SERVER_PORT}/callback`,
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
});

const updateAccessToken = async (req, res, next) => {
  const accessToken = await redisClient.get('accessToken');
  const refreshToken = await redisClient.get('refreshToken');
  const expiryTime = await redisClient.get('expiryTime');

  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);

  const currentTime = new Date().getTime();

  if (accessToken && refreshToken && expiryTime < currentTime) {
    try {
      const data = await spotifyApi.refreshAccessToken();
      const newAccessToken = data.body.access_token;
      const newExpirationTime = new Date().getTime() + data.body.expires_in * 1000;

      redisClient.set('accessToken', newAccessToken);
      redisClient.set('expiryTime', newExpirationTime);

      spotifyApi.setAccessToken(newAccessToken);
    } catch (error) {
      console.error(`Failed to refresh access token: ${error}`);
    }
  }
  next();
};

module.exports = { updateAccessToken };
