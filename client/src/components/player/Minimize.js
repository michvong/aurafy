import React, { useContext } from 'react';
import { UserInfoContext } from '../../contexts/UserInfo';

export default function Minimize() {
  const { userInfo, updateUserInfo } = useContext(UserInfoContext);

  const handleMinimizeClick = () => {
    updateUserInfo({ onFullPlayer: false });
    console.log('Miniplayer mode...');
  };

  return (
    <button
      class="mr-1 hover:scale-110 focus:scale-95 drop-shadow-lg"
      onClick={handleMinimizeClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 14h6v6M3 21l6.1-6.1M20 10h-6V4M21 3l-6.1 6.1" />
      </svg>
    </button>
  );
}
