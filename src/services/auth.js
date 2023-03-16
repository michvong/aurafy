import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import refreshAccessToken from '../services/middleware';

const spotifyApi = new SpotifyWebApi();

const authenticate = () => {
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirect_uri = 'http://localhost:3000/navbar';
  const scopes = ['user-read-private', 'user-read-email'];

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scopes.join(' '));
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

  window.location = url;
};

const useAccessToken = (token, setToken, setIsLoggedIn) => {
  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    window.location.hash = '';

    const accessToken = hash.access_token;
    if (accessToken) {
      setToken({
        access_token: accessToken,
        expires_at: Date.now() + hash.expires_in * 1000,
        refresh_token: hash.refresh_token,
      });
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn, setToken, token]);
};

const useRefreshToken = (token, updateUserInfo) => {
  useEffect(() => {
    if (token.access_token) {
      spotifyApi.setAccessToken(token.access_token);
      updateUserInfo();
      const timeout = token.expires_at - Date.now() - 30000; // Refresh token 30 seconds before it expires
      const refreshTokenInterval = setInterval(refreshAccessToken, timeout);
      return () => clearInterval(refreshTokenInterval);
    }
  }, [token, updateUserInfo]);
};

export { spotifyApi, authenticate, useAccessToken, useRefreshToken };
