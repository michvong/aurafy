import React from 'react';
import { useSpotifyPlayer } from 'react-spotify-web-playback-sdk';

export default function Next() {
  const player = useSpotifyPlayer();

  return (
    <button onClick={() => player.nextTrack()} class="p-3 hover:scale-110 focus:scale-95">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="white"
        stroke="#ffffff"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="hover:fill-current hover:text-green-500"
      >
        <polygon points="5 4 15 12 5 20 5 4"></polygon>
        <line x1="19" y1="5" x2="19" y2="19"></line>
      </svg>
    </button>
  );
}
