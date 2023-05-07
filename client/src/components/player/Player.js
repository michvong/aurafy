import React, { useState, useEffect } from 'react';
import { usePlaybackState, usePlayerDevice } from 'react-spotify-web-playback-sdk';
import api from '../../services/api';
import SongDetails from './SongDetails';
import Duration from './Duration';
import Controller from './Controller';
import Device from './Device';
import Volume from './Volume';
import Minimize from './Minimize';

export default function Player() {
  const [isCurrentDevice, setIsCurrentDevice] = useState(false);

  const playbackState = usePlaybackState({ interval: true });
  const device = usePlayerDevice();

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
        // console.log(err);
      }
    };
    fetchCurrentDevice();
  }, [playbackState, device]);

  return (
    <div class="h-screen w-screen bg-green-900 p-10">
      <div class="flex flex-col justify-between h-full">
        <div class="flex items-center">
          <button class="rounded-full ring-2 ring-white/70 w-10 h-10 flex items-center justify-center mr-6 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-white/70"
            >
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
          </button>

          <div class="flex flex-col">
            <div class="text-white/60 text-md font-medium tracking-wide">PLAYING FROM PLAYLIST</div>
            <div class="text-white/60 text-md font-medium tracking-wide">playlist_name</div>
          </div>
        </div>

        <div>
          <SongDetails />

          <div class="opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div class="flex justify-center">
              <Duration />
            </div>
            <div class="flex justify-center items-center h-16">
              <div class="flex-1 flex justify-start items-center">
                <Device />
              </div>
              <div class="flex-1 flex justify-center items-center">
                <Controller />
              </div>
              <div class="flex-1 flex justify-end items-center">
                <div class="flex items-center">
                  <Volume />
                  <Minimize />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
