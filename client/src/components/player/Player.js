import React from 'react';
import { usePlaybackState } from 'react-spotify-web-playback-sdk';
import SongDetails from './SongDetails';
import Controller from './Controller';
import Device from './Device';
import Volume from './Volume';

export default function Player() {
  const playbackState = usePlaybackState({ interval: true });

  return (
    <div class="relative">
      <div class="bottom-0 left-0 right-0 bg-stone-800 border-t border-stone-700 px-3 py-1 flex items-center justify-between">
        <SongDetails />
        <Controller />
        <div class="flex items-center">
          <Device />
          <Volume />
        </div>
      </div>

      {playbackState === null ? <div class="absolute inset-0 bg-stone-900 opacity-70"></div> : null}
    </div>
  );
}
