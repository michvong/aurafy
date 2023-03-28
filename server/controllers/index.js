const spotifyApi = require('../services/spotifyApi');

const getUserInfo = async (req, res, next) => {
  console.log('getUserInfo (index.js)');
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
    next(error);
  }
};

module.exports = {
  getUserInfo,
  getPlaylists,
};
