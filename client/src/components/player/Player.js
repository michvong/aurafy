import React, { useState, useEffect } from 'react';
import { usePlaybackState, usePlayerDevice } from 'react-spotify-web-playback-sdk';
import api from '../../services/api';
import SongDetails from './SongDetails';
import Duration from './Duration';
import Controller from './Controller';
import Device from './Device';
import Volume from './Volume';
import Minimize from './Minimize';

export default function Player({ currentTrackPalette }) {
  const [isCurrentDevice, setIsCurrentDevice] = useState(false);
  const [playlistName, setPlaylistName] = useState('playlist_name');

  const playbackState = usePlaybackState({ interval: true });
  const device = usePlayerDevice();

  useEffect(() => {
    // console.log(playbackState);
    // console.log(currentTrackPalette[0]);
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
    setPlaylistName(playbackState.context.metadata.name);
  }, [playbackState, device]);

  return (
    <div
      style={{
        '--current-track-palette-0': currentTrackPalette[0],
        '--current-track-palette-1': currentTrackPalette[1],
        '--current-track-palette-2': currentTrackPalette[2],
      }}
      class="h-screen w-screen bg-gradient-to-r from-current-track-palette-0 via-current-track-palette-1 to-current-track-palette-2 animate-gradient-linear p-10"
    >
      <div class="flex flex-col justify-between h-full">
        <div class="flex items-center">
          <div class="rounded-full ring-2 ring-white/70 w-10 h-10 flex items-center justify-center mr-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="5.5" cy="17.5" r="2.5" />
              <circle cx="17.5" cy="15.5" r="2.5" />
              <path d="M8 17V5l12-2v12" />
            </svg>
          </div>

          <div class="flex flex-col">
            <div class="text-white/60 text-md font-medium tracking-wide">PLAYING FROM PLAYLIST</div>
            <div class="text-white/60 text-md font-medium tracking-wide">{playlistName}</div>
          </div>
        </div>

        <div>
          <SongDetails />

          <div class="opacity-0 hover:opacity-100 relative transition-opacity duration-300">
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
