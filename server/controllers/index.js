const spotifyApi = require('../services/spotifyApi');
const { redisClient } = require('../store');

const getAccessToken = async (req, res, next) => {
  try {
    const accessToken = await redisClient.get('accessToken');
    res.json(accessToken);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const userInfo = await spotifyApi.getUserInfo();
    res.json(userInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getPlaylists = async (req, res, next) => {
  try {
    const playlists = await spotifyApi.getPlaylists();
    res.json(playlists);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getPlaylist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const playlist = await spotifyApi.getPlaylist(id);
    res.json(playlist);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const playTrack = async (req, res, next) => {
  const { track_uri, id } = req.params;
  try {
    await spotifyApi.playTrack(track_uri, id);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const playContext = async (req, res, next) => {
  const { context_uri, id } = req.params;
  try {
    await spotifyApi.playContext(context_uri, id);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAccessToken,
  getUserInfo,
  getPlaylists,
  getPlaylist,
  playTrack,
  playContext,
};
