const config = require('../utils/config');
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const { redisClient } = require('../store');

const router = express.Router();

const spotifyApi = new SpotifyWebApi({
  redirectUri: `http://localhost:${config.SERVER_PORT}/callback`,
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
});

router.get('/login', (req, res) => {
  console.log('Login function called successfully');
  const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify',
  ];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.send({ authorizeURL });
});

router.get('/callback', async (req, res, next) => {
  try {
    console.log('Callback function called successfully');
    const { code } = req.query;
    const data = await spotifyApi.authorizationCodeGrant(code);

    redisClient.set('accessToken', data.body.access_token);
    redisClient.set('refreshToken', data.body.refresh_token);
    redisClient.set('expiryTime', new Date().getTime() + data.body.expires_in * 1000);

    spotifyApi.setAccessToken(data.body.access_token);
    spotifyApi.setRefreshToken(data.body.refresh_token);

    res.redirect(`http://localhost:${config.CLIENT_PORT}/home`);
  } catch (error) {
    next(error);
  }
});

router.get('/logout', (req, res) => {
  console.log('Logout function called successfully');
  redisClient.del('accessToken', 'refreshToken', 'expiryTime');
  spotifyApi.resetAccessToken();
  spotifyApi.resetRefreshToken();
  res.send(`http://localhost:${config.CLIENT_PORT}/`);
});

module.exports = router;
