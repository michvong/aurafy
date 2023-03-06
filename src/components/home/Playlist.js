import React, { useEffect, useState } from 'react';

export default function Playlist() {
  const [playlistImage, setPlaylistImage] = useState();
  const [playlistName, setPlaylistName] = useState('Playlist name');
  const [playlistDesc, setPlaylistDesc] = useState('Playlist description');

  return (
    <div>
      <div class="flex flex-col items-center justify-items-center content-center block px-1 py-2 w-44 bg-stone-700 border border-gray-200 rounded-lg shadow">
        <div class="flex justify-center content-center mt-2">
          <img
            src={playlistImage || 'https://via.placeholder.com/300'}
            class="rounded-lg max-w-[80%] max-h-[80%] bg-gray-300"
            alt="Placeholder"
          />
        </div>

        <h5 class="truncate mt-2 text-base font-bold tracking-tight text-white">{playlistName}</h5>
        <p class="truncate mb-3 text-xs font-normal text-gray-200">{playlistDesc}</p>
      </div>
    </div>
  );
}
