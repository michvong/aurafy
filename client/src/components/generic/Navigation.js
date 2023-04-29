import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Loading() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <button
          onClick={() => navigate(-1)}
          type="button"
          class="text-white bg-stone-600 hover:scale-105 focus:bg-stone-500 focus:outline-none font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
          <span class="sr-only">Icon description</span>
        </button>

        <button
          onClick={() => navigate(1)}
          type="button"
          class="text-white bg-stone-600 hover:scale-105 focus:bg-stone-500 focus:outline-none font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h13M12 5l7 7-7 7" />
          </svg>
          <span class="sr-only">Icon description</span>
        </button>
      </div>
    </>
  );
}
