const config = require('../utils/config');
const SpotifyWebApi = require('spotify-web-api-node');
const { redisClient } = require('../store');

const spotifyApi = new SpotifyWebApi({
  redirectUri: `http://localhost:${config.SERVER_PORT}/callback`,
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
});

const getUserInfo = async () => {
  const accessToken = await redisClient.get('accessToken');
  spotifyApi.setAccessToken(accessToken);
  try {
    const { body: user } = await spotifyApi.getMe();
    console.log("Retrieved user's information");
    return user;
  } catch (error) {
    throw new Error(`Failed to get user's information: ${error.message}`);
  }
};

const getPlaylists = async () => {
  try {
    const {
      body: { items: playlists },
    } = await spotifyApi.getUserPlaylists();
    return playlists;
  } catch (error) {
    throw new Error(`Failed to get user's playlists: ${error.message}`);
  }
};

module.exports = {
  getUserInfo,
  getPlaylists,
};
