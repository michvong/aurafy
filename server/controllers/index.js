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

const getCurrentPlayingTrack = async (req, res, next) => {
  try {
    const track = await spotifyApi.getCurrentPlayingTrack();
    res.json(track);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCurrentPlaybackState = async (req, res, next) => {
  try {
    const state = await spotifyApi.getCurrentPlaybackState();
    res.json(state);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAudioFeaturesForTrack = async (req, res, next) => {
  const { id } = req.params;
  try {
    const features = await spotifyApi.getAudioFeaturesForTrack(id);
    res.json(features);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const playTrack = async (req, res, next) => {
  const { context_uri, track_uri, id } = req.params;
  try {
    await spotifyApi.playTrack(context_uri, track_uri, id);
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

const setShuffleState = async (req, res, next) => {
  const { state } = req.params;
  console.log(state);
  try {
    await spotifyApi.setShuffleState(state);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const setRepeatMode = async (req, res, next) => {
  const { state } = req.params;
  console.log(state);
  try {
    await spotifyApi.setRepeatMode(state);
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
  getCurrentPlayingTrack,
  getCurrentPlaybackState,
  getAudioFeaturesForTrack,
  playTrack,
  playContext,
  setShuffleState,
  setRepeatMode,
};
