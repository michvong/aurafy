import React, { useContext } from 'react';
import api from '../../services/api';
import { UserInfoContext } from '../../contexts/UserInfo';
import { UserPlaylistsContext } from '../../contexts/UserPlaylists';

export default function LogoutButton() {
  const { userInfo, updateUserInfo } = useContext(UserInfoContext);
  const { userPlaylists, updateUserPlaylists } = useContext(UserPlaylistsContext);

  const handleUpdateUserInfo = async () => {
    const updatedUserInfo = {
      userIcon: null,
      username: null,
      email: null,
    };
    updateUserInfo(updatedUserInfo);
  };

  const handleUpdateUserPlaylists = async () => {
    updateUserPlaylists(null);
  };

  const handleSignOut = async () => {
    try {
      const response = await api.logout();
      await handleUpdateUserInfo();
      await handleUpdateUserPlaylists();
      window.location.href = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="text-left block w-full px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
      onClick={handleSignOut}
    >
      Sign out
    </button>
  );
}
