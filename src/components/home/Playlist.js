import React, { useEffect, useState } from 'react';
import Music from '../../assets/music.svg';

export default function Playlist() {
  const [playlistImage, setPlaylistImage] = useState();
  const [playlistName, setPlaylistName] = useState('Playlist name');
  const [playlistDesc, setPlaylistDesc] = useState('Playlist description');

  return (
    <div>
      <div class="flex flex-col items-center justify-items-center content-center block px-1 py-2 w-44 bg-stone-700 border border-gray-200 rounded-lg shadow">
        <div class="flex justify-center content-center mt-2">
          {playlistImage ? (
            <img
              src={playlistImage}
              class="rounded-lg max-w-36 max-h-36 bg-gray-400"
              alt="Playlist image"
            />
          ) : (
            <div class="w-36 h-36 bg-gray-400 flex justify-center items-center">
              <img src={Music} alt="Music icon" style={{ width: '50%', height: '50%' }} />
            </div>
          )}
        </div>

        <h5 class="truncate mt-2 text-base font-bold tracking-tight text-white">{playlistName}</h5>
        <p class="truncate mb-3 text-xs font-normal text-gray-200">{playlistDesc}</p>
      </div>
    </div>
  );
}
