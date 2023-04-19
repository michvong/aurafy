import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Playlist({ playlistInfo }) {
  let trackNumberCounter = 1;
  const [playlist, setPlaylist] = useState(playlistInfo);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">#</div>
              </th>
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Album
              </th>
              <th scope="col" class="px-6 py-3">
                Palette
              </th>
              <th scope="col" class="px-6 py-3">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks.items.map((item) => (
              <tr key={item.track.id} className="bg-gray-100">
                <td className="border px-4 py-2">{trackNumberCounter++}</td>
                <td className="border px-4 py-2 flex items-center">
                  <img
                    src={item.track.album.images[0].url}
                    alt={`${item.track.album.name} album cover`}
                    className="mr-2 w-10 h-10"
                  />
                  {item.track.name}
                </td>
                <td className="border px-4 py-2">
                  {item.track.artists.map((artist) => artist.name).join(', ')}
                </td>
                <td className="border px-4 py-2">{item.track.album.name}</td>
                <td className="border px-4 py-2">
                  {msToMinutesAndSeconds(item.track.duration_ms)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
