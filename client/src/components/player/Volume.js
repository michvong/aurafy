import React, { useState, useEffect } from 'react';

export default function Volume() {
  const [volume, setVolume] = useState(50);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const VolumeIcon = ({ volume }) => {
    if (volume <= 0) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6" />
        </svg>
      );
    } else if (volume < 50) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      );
    }
  };

  return (
    <>
      <div class="flex items-center">
        <VolumeIcon volume={volume} />
        <div class="mx-3 w-28 h-6 relative">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            class="w-full h-full absolute opacity-0 cursor-pointer z-10"
            id="volume-bar"
          />
          <div class="bg-gray-500 w-full h-1 absolute top-1/2 left-0 rounded-full transform -translate-y-1/2">
            <div class="bg-green-500 h-full rounded-full" style={{ width: `${volume}%` }}></div>
            <div
              class="absolute w-3 h-3 bg-white rounded-full shadow-lg -top-1 left-1 transform -translate-x-1/2 cursor-pointer"
              style={{ transform: `translateX(-50%)`, left: `${volume}%` }}
              draggable="false"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
