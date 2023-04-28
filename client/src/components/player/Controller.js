import React, { useState, useEffect, memo } from 'react';
import {
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
  usePlayerDevice,
} from 'react-spotify-web-playback-sdk';

export default memo(function Controller() {
  const [songDuration, setSongDuration] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useSpotifyPlayer();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const device = usePlayerDevice();

  // useEffect(() => {
  //   console.log('SDK is ready!');
  //   // player.connect();
  //   console.log(player);
  //   console.log(device);
  // }, []);

  if (player === null) return null;
  // if (device === null) return null;

  const handleDurationChange = (event) => {
    setSongDuration(event.target.value);
  };

  const handlePlaybackChange = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
    player.togglePlay();
  };

  return (
    <>
      <div class="flex flex-col items-center">
        <div class="flex items-center -mb-2">
          <button class="p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5" />
            </svg>
          </button>

          <button onClick={() => player.previousTrack()} class="p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>

          {isPlaying ? (
            <button onClick={handlePlaybackChange} class="p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="10" y1="15" x2="10" y2="9"></line>
                <line x1="14" y1="15" x2="14" y2="9"></line>
              </svg>
            </button>
          ) : (
            <button onClick={handlePlaybackChange} class="p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
            </button>
          )}

          <button onClick={() => player.nextTrack()} class="p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
              stroke="#ffffff"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>

          <button class="p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 2.1l4 4-4 4" />
              <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
              <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
            </svg>
          </button>
        </div>

        <div class="flex flex-row items-center">
          <span class="text-white text-xs">0:00</span>
          <div class="mx-2 w-96 h-6 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={songDuration}
              onChange={handleDurationChange}
              class="w-full h-full absolute opacity-0 cursor-pointer z-10"
              id="duration-bar"
            />
            <div class="bg-gray-500 w-full h-1 absolute top-1/2 left-0 rounded-full transform -translate-y-1/2">
              <div class="bg-white h-full rounded-full" style={{ width: `${songDuration}%` }}></div>
              <div
                class="absolute w-3 h-3 bg-white rounded-full shadow-lg -top-1 left-1 transform -translate-x-1/2 cursor-pointer "
                style={{ transform: `translateX(-50%)`, left: `${songDuration}%` }}
                draggable="false"
              ></div>
            </div>
          </div>
          <span class="text-white text-xs">3:30</span>
        </div>
      </div>
    </>
  );
});
