import spotifyApi from './auth';

const refreshAccessToken = async (token, setToken) => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  const authString = `${clientId}:${clientSecret}`;
  const encodedAuthString = Buffer.from(authString).toString('base64');

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedAuthString}`,
    },
    body: `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
  })
    .then((response) => response.json())
    .then((data) => {
      setToken({
        access_token: data.access_token,
        expires_at: Date.now() + data.expires_in * 1000,
        refresh_token: token.refresh_token,
      });
      spotifyApi.setAccessToken(data.access_token);
    })
    .catch((error) => {
      console.log('Error refreshing access token:', error);
    });
};

export default refreshAccessToken;
