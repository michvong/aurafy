import React, { useState, useEffect } from 'react';
import api from '../../services/api';

// pass the actual playlist later
export default function Tracklist({ playlistId }) {
  let trackNumberCounter = 1;
  const [playlist, setPlaylist] = useState({ tracks: { items: [] } });

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await api.getPlaylist(playlistId);
        setPlaylist(response.data);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchPlaylist();
  }, []);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <div class="relative overflow-x-auto">
        <table class="h-full w-full table-auto text-sm truncate text-white">
          <thead class="text-xs uppercase bg-transparent text-white">
            <tr>
              <th scope="col" class="px-4 py-4 text-right">
                #
              </th>
              <th scope="col" class="px-4 py-4 text-left">
                Title
              </th>
              <th scope="col" class="px-4 py-4 text-left">
                Palette
              </th>
              <th scope="col" class="px-4 py-4 flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks.items.length === 0 ? (
              <tr>
                <td class="px-4 py-2" colspan="4">
                  Playlist is empty.
                </td>
              </tr>
            ) : (
              playlist.tracks.items.map((item) => (
                <tr key={item.track.id} class="group bg-transparent hover:bg-stone-800/50">
                  <td class="px-4 py-2">
                    <div class="relative text-right">
                      <span class="pr-1 group-hover:text-transparent">{trackNumberCounter++}</span>
                      <div class="absolute right-0 bottom-0 opacity-0 group-hover:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td class="pr-4 py-2 flex items-center">
                    <img
                      src={item.track.album.images[0].url}
                      alt={`${item.track.album.name} album cover`}
                      class="mr-4 w-10 h-10"
                    />
                    <div class="flex flex-col">
                      <div class="font-semibold text-white">{item.track.name}</div>
                      <div class="text-stone-300">
                        {item.track.artists.map((artist) => artist.name).join(', ')}
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-2 text-left">_ _ _ _ _</td>
                  <td class="px-4 py-2 text-right">
                    {msToMinutesAndSeconds(item.track.duration_ms)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}