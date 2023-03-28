import axios from 'axios';

const login = async () => {
  // const { data } = await axios.get('/api/login');
  const response = await axios.get('http://localhost:8000/login');
  return response;
};

const getUserInfo = async () => {
  // const { data } = await axios.get('/api/user');
  const response = await axios.get('http://localhost:8000/user');
  return response;
};

export default {
  login,
  getUserInfo,
};
