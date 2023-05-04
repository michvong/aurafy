import React, { useState } from 'react';
import { useSpotifyPlayer } from 'react-spotify-web-playback-sdk';

export default function Volume() {
  const [currentVolume, setCurrentVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);

  const player = useSpotifyPlayer();

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setCurrentVolume(newVolume);
    setPrevVolume(newVolume);
    player.setVolume(newVolume / 100);
  };

  const handleVolumeClick = () => {
    if (currentVolume === 0) {
      setCurrentVolume(prevVolume);
      player.setVolume(prevVolume / 100);
    } else {
      setCurrentVolume(0);
      player.setVolume(0);
    }
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
        <button onClick={handleVolumeClick}>
          <VolumeIcon volume={currentVolume} />
        </button>
        <div class="mx-2 w-28 h-6 relative">
          <input
            type="range"
            min="0"
            max="100"
            value={currentVolume}
            onChange={handleVolumeChange}
            class="w-full h-full absolute opacity-0 cursor-pointer z-10"
            id="volume-bar"
          />
          <div class="bg-gray-500 w-full h-1 absolute top-1/2 left-0 rounded-full transform -translate-y-1/2">
            <div
              class="bg-green-500 h-full rounded-full"
              style={{ width: `${currentVolume}%` }}
            ></div>
            <div
              class="absolute w-3 h-3 bg-white rounded-full shadow-lg -top-1 left-1 transform -translate-x-1/2 cursor-pointer"
              style={{ transform: `translateX(-50%)`, left: `${currentVolume}%` }}
              draggable="false"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
