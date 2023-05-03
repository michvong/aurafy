import React from 'react';
import { useSpotifyPlayer } from 'react-spotify-web-playback-sdk';

export default function Previous() {
  const player = useSpotifyPlayer();

  return (
    <button onClick={() => player.previousTrack()} class="p-3 hover:scale-110 focus:scale-95">
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
        class="hover:fill-current hover:text-green-500"
      >
        <polygon points="19 20 9 12 19 4 19 20"></polygon>
        <line x1="5" y1="19" x2="5" y2="5"></line>
      </svg>
    </button>
  );
}
