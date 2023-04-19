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
    return user;
  } catch (error) {
    throw new Error(`Failed to get user's information: ${error.message}`);
  }
};

const getPlaylists = async () => {
  const accessToken = await redisClient.get('accessToken');
  spotifyApi.setAccessToken(accessToken);
  try {
    const {
      body: { items: playlists },
    } = await spotifyApi.getUserPlaylists();
    return playlists;
  } catch (error) {
    throw new Error(`Failed to get user's playlists: ${error.message}`);
  }
};

const getPlaylist = async (playlistId) => {
  const accessToken = await redisClient.get('accessToken');
  spotifyApi.setAccessToken(accessToken);
  try {
    const { body: playlist } = await spotifyApi.getPlaylist(playlistId);
    console.log("Retrieved playlist's information");
    return playlist;
  } catch (error) {
    throw new Error(`Failed to get playlist: ${error.message}`);
  }
};

module.exports = {
  getUserInfo,
  getPlaylists,
  getPlaylist,
};
