import React, { useState, useContext, useEffect } from 'react';
import { UserInfoContext } from '../../contexts/UserInfo';

export default function Home() {
  const [greeting, setGreeting] = useState();
  const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 5 && hours < 12) {
      setGreeting('Good morning');
    } else if (hours >= 12 && hours < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <div>
      <div class="block max-w-full p-10 bg-stone-800 shadow border-b border-stone-700">
        <h5 class="mb-2 text-4xl font-extrabold tracking-tight text-white">
          {greeting}, <span class="text-green-500">{userInfo.username}</span>
        </h5>
        <p class="font-normal text-gray-200">
          "Aurafy" this environment based on songs in your playlists.
        </p>
      </div>
    </div>
  );
}
