import axios from 'axios';

const login = async () => {
  // const { data } = await axios.get('/api/login');
  const response = await axios.get('http://localhost:8000/login');
  return response;
};

const logout = async () => {
  const response = await axios.get('http://localhost:8000/logout');
  return response;
};

const getAccessToken = async () => {
  const response = await axios.get('http://localhost:8000/access-token');
  return response;
};

const getUserInfo = async () => {
  // const { data } = await axios.get('/api/user');
  const response = await axios.get('http://localhost:8000/user');
  return response;
};

const getUserPlaylists = async () => {
  const response = await axios.get('http://localhost:8000/playlists');
  return response;
};

const getPlaylist = async (playlistId) => {
  const response = await axios.get(`http://localhost:8000/playlist/${playlistId}`);
  return response;
};

const playTrack = async (contextUri, trackUri, deviceId) => {
  await axios.get(`http://localhost:8000/playlist/${contextUri}/${trackUri}/${deviceId}`);
};

const playContext = async (contextUri, deviceId) => {
  await axios.get(`http://localhost:8000/playlist/${contextUri}/${deviceId}`);
};

const setShuffleState = async (state) => {
  await axios.get(`http://localhost:8000/shuffle/${state}`);
};

const setRepeatMode = async (state) => {
  await axios.get(`http://localhost:8000/repeat/${state}`);
};

export default {
  login,
  logout,
  getAccessToken,
  getUserInfo,
  getUserPlaylists,
  getPlaylist,
  playTrack,
  playContext,
  setShuffleState,
  setRepeatMode,
};
