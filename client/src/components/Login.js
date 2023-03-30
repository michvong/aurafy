import React, { useEffect, useContext } from 'react';
import api from '../services/api';
import { UserInfoContext } from '../contexts/UserInfo';
import { UserPlaylistsContext } from '../contexts/UserPlaylists';

export default function LoginButton() {
  const { userInfo, updateUserInfo } = useContext(UserInfoContext);
  const { userPlaylists, updateUserPlaylists } = useContext(UserPlaylistsContext);

  useEffect(() => {
    if (!userInfo.username) {
      handleUpdateUserInfo();
      handleUpdateUserPlaylists();
    }
  }, [userInfo]);

  const handleUpdateUserInfo = async () => {
    try {
      const response = await api.getUserInfo();
      const updatedUserInfo = {
        userIcon: response.data.images?.[0]?.url,
        username: response.data.display_name,
        email: response.data.email,
      };
      updateUserInfo(updatedUserInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUserPlaylists = async () => {
    try {
      const response = await api.getUserPlaylists();
      console.log(response);
      updateUserPlaylists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await api.login();
      await handleUpdateUserInfo();
      await handleUpdateUserPlaylists();
      const authorizeURL = response.data.authorizeURL;
      window.location.href = authorizeURL;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="text-left block w-full px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
      onClick={handleSignIn}
    >
      Sign in
    </button>
  );
}
