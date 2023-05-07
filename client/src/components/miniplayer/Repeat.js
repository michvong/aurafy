import React, { useState } from 'react';
import api from '../../services/api';

export default function Shuffle() {
  const [repeatState, setRepeatState] = useState('off');

  const handleRepeatState = () => {
    if (repeatState === 'off') {
      setRepeatState('context');
      api.setRepeatMode('context');
    } else if (repeatState === 'context') {
      setRepeatState('track');
      api.setRepeatMode('track');
    } else {
      setRepeatState('off');
      api.setRepeatMode('off');
    }
  };

  return (
    <>
      <button onClick={handleRepeatState} class="p-6 hover:scale-125 focus:scale-95">
        {repeatState === 'off' && (
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
            <path d="M17 2.1l4 4-4 4" />
            <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
            <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
          </svg>
        )}
        {repeatState === 'context' && (
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
            class="stroke-green-500"
          >
            <path d="M17 2.1l4 4-4 4" />
            <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
            <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
          </svg>
        )}
        {repeatState === 'track' && (
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
            class="stroke-green-500"
          >
            <path d="M17 2.1l4 4-4 4" />
            <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
            <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
            <text x="50%" y="62%" text-anchor="middle" class="fill-green-500 text-[8px] font-thin">
              1
            </text>
          </svg>
        )}
      </button>
    </>
  );
}
