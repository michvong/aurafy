import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const authenticate = async (accessToken, setToken, setIsLoggedIn) => {
  setToken({
    access_token: accessToken,
    expires_at: Date.now() + accessToken.expires_in * 1000,
    refresh_token: accessToken.refresh_token,
  });
  setIsLoggedIn(true);
};

const setAccessToken = async (accessToken) => {
  spotifyApi.setAccessToken(accessToken);
};

export default { spotifyApi, authenticate, setAccessToken };
