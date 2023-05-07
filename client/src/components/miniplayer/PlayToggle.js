import React, { useState, useEffect } from 'react';
import { useSpotifyPlayer, usePlaybackState } from 'react-spotify-web-playback-sdk';

export default function PlayToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackState = usePlaybackState({ interval: true });

  const player = useSpotifyPlayer();

  useEffect(() => {
    if (playbackState?.paused) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [playbackState]);

  return (
    <>
      {isPlaying ? (
        <button onClick={() => player.togglePlay()} class="p-3 hover:scale-110 focus:scale-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
        <button onClick={() => player.togglePlay()} class="p-3 hover:scale-110 focus:scale-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
    </>
  );
}
