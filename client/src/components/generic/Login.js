import React, { useContext } from 'react';
import api from '../../services/api';
import { UserInfoContext } from '../../contexts/UserInfo';
import { UserPlaylistsContext } from '../../contexts/UserPlaylists';

export default function LoginButton({ isLanding }) {
  const { userInfo, updateUserInfo } = useContext(UserInfoContext);
  const { userPlaylists, updateUserPlaylists } = useContext(UserPlaylistsContext);

  const handleUpdateUserInfo = async () => {
    try {
      const response = await api.getUserInfo();
      updateUserInfo({
        userIcon: response.data.images?.[0]?.url,
        username: response.data.display_name,
        email: response.data.email,
        hasCompletedGuide: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateUserPlaylists = async () => {
    try {
      const response = await api.getUserPlaylists();
      updateUserPlaylists(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await api.login();
      const authorizeURL = response.data.authorizeURL;
      await handleUpdateUserInfo();
      await handleUpdateUserPlaylists();
      window.location.href = authorizeURL;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLanding ? (
        <button
          onClick={handleSignIn}
          class="mb-4 text-center text-2xl font-medium text-white group transition duration-300 font-mono"
        >
          {'<'} start here {'>'}
          <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400"></span>
        </button>
      ) : (
        <button
          className="text-left block w-full px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
          onClick={handleSignIn}
        >
          Sign in
        </button>
      )}
    </div>
  );
}
