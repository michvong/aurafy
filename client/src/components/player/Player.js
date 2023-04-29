import React, { useState, useEffect, useCallback } from 'react';
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk';
import api from '../../services/api';
import SongDetails from './SongDetails';
import Controller from './Controller';
import Volume from './Volume';

export default function Player() {
  const [accessToken, setAccessToken] = useState('');
  const getOAuthToken = useCallback((callback) => callback(accessToken), [accessToken]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await api.getAccessToken();
        setAccessToken(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <div class="bottom-0 left-0 right-0 bg-stone-800 px-3 py-1 flex items-center justify-between">
      <WebPlaybackSDK
        initialDeviceName="aurafy"
        getOAuthToken={getOAuthToken}
        connectOnInitialized={true}
        initialVolume={0.5}
      >
        <SongDetails />
        <Controller />
        <Volume />
      </WebPlaybackSDK>
    </div>
  );
}
