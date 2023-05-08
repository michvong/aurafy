import React, { useState, useContext } from 'react';
import { useSpotifyPlayer } from 'react-spotify-web-playback-sdk';
import { UserInfoContext } from '../../contexts/UserInfo';

export default function Guide() {
  const { userInfo, updateUserInfo } = useContext(UserInfoContext);
  const [showGuide, setShowGuide] = useState(true);

  const player = useSpotifyPlayer();

  const handleCompleteGuide = () => {
    updateUserInfo({ hasCompletedGuide: true });
    setShowGuide(true);
    player.connect();
    console.log('Connected to player!');
  };

  if (!showGuide || userInfo.hasCompletedGuide) {
    return null;
  }

  return (
    <div>
      <div class="flex justify-center items-center bg-gray-900/80  w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
        <div class="mt-7 opacity-100 duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div class="relative flex flex-col bg-black shadow-lg rounded-xl">
            <div class="p-4 sm:p-10 text-center overflow-y-auto">
              <span class="mb-4 inline-flex justify-center items-center w-[56px] h-[56px]">
                <img
                  src="https://em-content.zobj.net/thumbs/240/apple/325/crystal-ball_1f52e.png"
                  alt="aurafy Logo"
                />
              </span>

              <h3 class="mb-2 text-2xl font-bold text-gray-200 font-mono">
                Welcome to{' '}
                <span class="inline-flex items-center gap-x-1.5 decoration-2 font-medium bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 animate-gradient-xy bg-clip-text text-transparent font-semibold">
                  aurafy
                </span>
                !
              </h3>
              <p class="text-md text-gray-400">
                Play any song and the background will change according its{' '}
                <span class="inline-flex items-center gap-x-1.5 text-green-500 decoration-2 font-medium">
                  palette
                </span>{' '}
                in the full-screen player. You can expand the player window by clicking the maximize
                button on the miniplayer.
              </p>

              <div class="mt-6 flex justify-center gap-x-4">
                <button
                  onClick={handleCompleteGuide}
                  type="button"
                  class="hover:animate-wiggle hover:animate-infinite transition ease-in-out delay-70 hover:-translate-y-0.5 hover:scale-110 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-transparent text-gray-400 shadow-sm align-middle hover:bg-gray-500/40 transition-all text-sm"
                >
                  Let's go!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
