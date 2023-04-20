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

export default {
  login,
  logout,
  getUserInfo,
  getUserPlaylists,
  getPlaylist,
};
