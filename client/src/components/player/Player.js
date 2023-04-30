import React, { useEffect } from 'react';
import { usePlayerDevice } from 'react-spotify-web-playback-sdk';
import api from '../../services/api';
import SongDetails from './SongDetails';
import Controller from './Controller';
import Volume from './Volume';

export default function Player() {
  const playerDevice = usePlayerDevice();

  useEffect(() => {
    if (playerDevice?.device_id === undefined) return;

    const transferPlayback = async () => {
      try {
        await api.transferPlayback(playerDevice.device_id);
      } catch (err) {
        console.log(err);
      }
    };

    console.log(playerDevice.device_id);
    transferPlayback();
  }, []);

  return (
    <div class="bottom-0 left-0 right-0 bg-stone-800 border-t border-stone-700 px-3 py-1 flex items-center justify-between">
      <SongDetails />
      <Controller />
      <Volume />
    </div>
  );
}
