import React, { useEffect, useContext } from 'react';
import api from '../services/api';
import { UserInfoContext } from '../contexts/UserInfo';

export default function LoginButton() {
  const { userInfo, updateUserInfo } = useContext(UserInfoContext);

  useEffect(() => {
    if (!userInfo.username) {
      handleUpdateUserInfoOnSignIn();
    }
  }, [userInfo]);

  const handleUpdateUserInfoOnSignIn = async () => {
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

  const handleSignIn = async () => {
    try {
      const response = await api.login();
      await handleUpdateUserInfoOnSignIn();
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
