import React, { useState, useEffect } from 'react';
import { usePlaybackState, usePlayerDevice } from 'react-spotify-web-playback-sdk';
import api from '../../services/api';
import SongDetails from './SongDetails';
import Controller from './Controller';
import Device from './Device';
import Volume from './Volume';
import Maximize from './Maximize';

export default function Miniplayer({ setOnFullPlayer }) {
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
    <div class="relative">
      <div class="bottom-0 left-0 right-0 bg-stone-800 border-t border-stone-700 px-3 py-1 flex items-center justify-between">
        <SongDetails />
        <Controller />
        <div class="flex items-center">
          <Device />
          <Volume />
          <Maximize setOnFullPlayer={setOnFullPlayer} />
        </div>
      </div>

      {!isCurrentDevice ? <div class="absolute inset-0 bg-stone-900 opacity-70"></div> : null}
    </div>
  );
}
