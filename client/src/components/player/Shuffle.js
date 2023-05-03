import React, { useState } from 'react';
import api from '../../services/api';

export default function Shuffle() {
  const [shuffleState, setShuffleState] = useState(false);

  const handleShuffleState = async () => {
    if (shuffleState) {
      setShuffleState(false);
      await api.setShuffleState(false);
    } else {
      setShuffleState(true);
      await api.setShuffleState(true);
    }
  };

  return (
    <>
      <button onClick={handleShuffleState} class="p-6 hover:scale-125 focus:scale-95">
        {!shuffleState ? (
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
            <path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5" />
          </svg>
        ) : (
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
            <path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5" />
          </svg>
        )}
      </button>
    </>
  );
}
