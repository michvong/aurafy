import React, { useState, useEffect } from 'react';
import { usePlayerDevice, usePlaybackState } from 'react-spotify-web-playback-sdk';
import { Tooltip } from 'flowbite-react';
import api from '../../services/api';

export default function Device() {
  const [isCurrentDevice, setIsCurrentDevice] = useState(false);

  const device = usePlayerDevice();
  const playbackState = usePlaybackState();

  useEffect(() => {
    const fetchCurrentDevice = async () => {
      try {
        const response = await api.getCurrentPlaybackState();
        if (playbackState && response.data.device.id === device?.device_id) {
          setIsCurrentDevice(true);
        } else {
          setIsCurrentDevice(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentDevice();
  }, [playbackState, device]);

  return (
    <div>
      {isCurrentDevice ? (
        <Tooltip
          className="bg-stone-900 text-xs"
          content="Currently playing on aurafy"
          animation="duration-300"
        >
          <button class="flex items-center mx-2">
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
              class="stroke-green-500"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <circle cx="12" cy="14" r="4"></circle>
              <line x1="12" y1="6" x2="12.01" y2="6"></line>
            </svg>
          </button>
        </Tooltip>
      ) : (
        <div class="flex items-center mx-2">
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
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <circle cx="12" cy="14" r="4"></circle>
            <line x1="12" y1="6" x2="12.01" y2="6"></line>
          </svg>
        </div>
      )}
    </div>
  );
}
