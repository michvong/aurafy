import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import refreshAccessToken from '../services/middleware';
import api from '../services/api';

const spotifyApi = new SpotifyWebApi();

export default function NavBar() {
  const [userIcon, setUserIcon] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

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
  }, []);

  useEffect(() => {
    if (token.access_token) {
      spotifyApi.setAccessToken(token.access_token);
      updateUserInfo();
      const timeout = token.expires_at - Date.now() - 30000; // Refresh token 30 seconds before it expires
      const refreshTokenInterval = setInterval(refreshAccessToken, timeout);
      return () => clearInterval(refreshTokenInterval);
    }
  }, [token]);

  const updateUserInfo = async () => {
    try {
      const userInfo = await api.getUserInfo();
      console.log('userInfo:', userInfo);
      setUsername(userInfo.display_name);
      setEmail(userInfo.email);
      if (userInfo.images && userInfo.images.length > 0) {
        setUserIcon(userInfo.images[0].url);
      }
    } catch (err) {
      console.log('Error updating user info', err);
      throw err;
    }
  };

  const handleSignIn = () => {
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

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setToken('');
    setUsername('Guest');
    setEmail('');
    setUserIcon('');
  };

  return (
    <div>
      <nav class="bg-stone-900 border-gray-200 px-2 sm:px-4 py-2.5">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <div class="flex items-center">
            <img
              src="https://em-content.zobj.net/thumbs/240/apple/325/crystal-ball_1f52e.png"
              class="h-6 mr-3 sm:h-9"
              alt="aurafy Logo"
            />
            <span class="self-center text-white text-xl font-semibold whitespace-nowrap">
              aurafy
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
            >
              <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                {userIcon ? (
                  <img class="h-full w-full rounded-full" src={userIcon} alt="Profile Picture" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                )}
              </div>
              <p className="mx-2 font-medium text-white">{username}</p>
              <svg
                className="w-4 h-4 mr-1"
                aria-hidden="true"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <div
              id="dropdownAvatar"
              className={`z-10 ${
                isOpen ? '' : 'hidden'
              } absolute mt-2 bg-stone-900 divide-y divide-gray-600 rounded-lg shadow w-44`}
              style={{ top: 'calc(100% + 0.5rem)', right: '0' }}
            >
              <div class="px-4 py-3 text-sm text-white">
                <div>{username}</div>
                <div class="text-xs truncate">{isLoggedIn ? email : null}</div>
              </div>
              <ul class="py-2 text-sm text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                    About
                  </a>
                </li>
              </ul>
              <div class="py-2">
                <button
                  className="text-left block w-full px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                  onClick={isLoggedIn ? handleSignOut : handleSignIn}
                >
                  {isLoggedIn ? 'Sign out' : 'Sign in'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
