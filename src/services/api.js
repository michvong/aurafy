import auth from './auth';

const getUserInfo = async () => {
  try {
    const response = await auth.spotifyApi.getMe();
    console.log('getMe response:', response);
    return response;
  } catch (err) {
    console.log('Error getting user info', err);
    throw err;
  }
};

export default { getUserInfo };
