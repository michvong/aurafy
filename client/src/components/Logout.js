import React, { useEffect, useContext } from 'react';
import api from '../services/api';
import { UserInfoContext } from '../contexts/UserInfo';

export default function LoginButton() {
  const { userInfo, updateUserInfo } = useContext(UserInfoContext);

  //   useEffect(() => {
  //     if (userInfo.username) {
  //       handleUpdateUserInfoOnSignOut();
  //     }
  //   }, [userInfo]);

  const handleUpdateUserInfoOnSignOut = async () => {
    const updatedUserInfo = {
      userIcon: null,
      username: null,
      email: null,
    };
    updateUserInfo(updatedUserInfo);
  };

  const handleSignOut = async () => {
    // try {
    //   const response = await api.logout();
    // await handleUpdateUserInfoOnSignOut();
    //   window.location.href = response.data;
    // } catch (error) {
    //   console.error(error);
    // }
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
