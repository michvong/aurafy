const spotifyApi = require('../services/spotifyApi');

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

module.exports = {
  getUserInfo,
  getPlaylists,
  getPlaylist,
};
