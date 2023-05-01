import React, { useEffect } from 'react';
import SongDetails from './SongDetails';
import Controller from './Controller';
import Volume from './Volume';

export default function Player() {
  return (
    <div class="bottom-0 left-0 right-0 bg-stone-800 border-t border-stone-700 px-3 py-1 flex items-center justify-between">
      <SongDetails />
      <Controller />
      <Volume />
    </div>
  );
}
