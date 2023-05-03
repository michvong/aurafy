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
    return playlist;
  } catch (error) {
    throw new Error(`Failed to get playlist: ${error.message}`);
  }
};

const playTrack = async (contextUri, trackUri, deviceId) => {
  const accessToken = await redisClient.get('accessToken');
  spotifyApi.setAccessToken(accessToken);
  try {
    await spotifyApi.play({
      context_uri: contextUri,
      offset: { uri: trackUri },
      device_id: deviceId,
    });
    console.log(`Playing track ${trackUri} on device ${deviceId}`);
  } catch (error) {
    throw new Error(`Failed to play context: ${error.message}`);
  }
};

const playContext = async (contextUri, deviceId) => {
  const accessToken = await redisClient.get('accessToken');
  spotifyApi.setAccessToken(accessToken);
  try {
    await spotifyApi.play({ context_uri: contextUri, device_id: deviceId });
    console.log(`Playing context ${contextUri} on device ${deviceId}`);
  } catch (error) {
    throw new Error(`Failed to play context: ${error.message}`);
  }
};

const setShuffleState = async (state) => {
  const accessToken = await redisClient.get('accessToken');
  spotifyApi.setAccessToken(accessToken);
  try {
    await spotifyApi.setShuffle(state);
    console.log(`Setting shuffle with state: ${state}`);
  } catch (error) {
    throw new Error(`Failed to change shuffle state: ${error.message}`);
  }
};

const setRepeatMode = async (state) => {
  const accessToken = await redisClient.get('accessToken');
  spotifyApi.setAccessToken(accessToken);
  try {
    await spotifyApi.setRepeat(state);
    console.log(`Setting repeat mode with state: ${state}`);
  } catch (error) {
    throw new Error(`Failed to change repeat mode: ${error.message}`);
  }
};

module.exports = {
  getUserInfo,
  getPlaylists,
  getPlaylist,
  playTrack,
  playContext,
  setShuffleState,
  setRepeatMode,
};
