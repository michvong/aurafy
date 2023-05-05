import React, { useState, useEffect } from 'react';
import { usePlayerDevice } from 'react-spotify-web-playback-sdk';
import Music from '../../assets/music.svg';
import api from '../../services/api';
import Alert from './Alert';
import { formatDurationMS } from '../../services/formatDurationMS';
import generateColourPalette from '../../services/generateColourPalette';

export default function Tracklist({ playlistId }) {
  let trackNumberCounter = 1;
  const [playlist, setPlaylist] = useState({ tracks: { items: [] } });
  const [playlistPalettes, setPlaylistPalettes] = useState([]);
  const [isLocalTrack, setIsLocalTrack] = useState(false);

  const playerDevice = usePlayerDevice();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await api.getPlaylist(playlistId);
        console.log(response.data);
        setPlaylist(response.data);

        const palettes = [];
        for (const item of response.data.tracks.items) {
          const audioFeatures = await api.getAudioFeaturesForTrack(item.track.id);
          // console.log(audioFeatures);
          const palette = await generateColourPalette(
            audioFeatures.data.danceability,
            audioFeatures.data.energy,
            audioFeatures.data.valence,
            audioFeatures.data.tempo,
            audioFeatures.data.acousticness
          );
          palettes.push(palette);
        }

        setPlaylistPalettes(palettes);
        // console.log(palettes);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsLocalTrack(false);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isLocalTrack]);

  const handlePlayTrack = async (contextUri, trackUri, deviceId) => {
    const isLocalTrackUri = /^spotify:local:.*$/.test(trackUri);
    if (isLocalTrackUri) {
      setIsLocalTrack(true);
      console.log(`Cannot play local track URI: ${trackUri}`);
      return;
    }

    try {
      await api.playTrack(contextUri, trackUri, deviceId);
    } catch (err) {
      console.log(err);
    }
  };

  if (playlist.tracks.items.length === 0) {
    return <div class="text-center text-white text-sm py-10">Nothing to see here.</div>;
  }

  return (
    <div>
      {isLocalTrack && (
        <div class="animate-fade absolute bottom-0 right-0 mx-2 mb-20 z-50">
          <Alert />
        </div>
      )}

      <div class="relative overflow-x-auto">
        <table class="h-full w-full bg-stone-800/75 table-auto text-sm truncate text-white">
          <thead class="text-xs uppercase bg-transparent text-white">
            <tr>
              <th scope="col" class="px-4 py-4 text-center">
                #
              </th>
              <th scope="col" class="pr-4 py-4 text-left">
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
            {playlist.tracks.items.map((item, index) => (
              <tr
                key={item.track.id || index}
                class="group bg-transparent transition ease-in-out delay-120 hover:bg-stone-700/50 duration-150"
              >
                <td class="px-4 py-2">
                  <div class="relative text-center">
                    <span class="pr-1 group-hover:text-transparent">{trackNumberCounter++}</span>
                    <button
                      onClick={() =>
                        handlePlayTrack(playlist.uri, item.track.uri, playerDevice.device_id)
                      }
                      class="flex justify-center absolute left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="white"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </button>
                  </div>
                </td>
                <td class="pr-4 py-2 flex items-center">
                  {item.track.album.images[0] ? (
                    <img
                      src={item.track.album.images[0]?.url}
                      alt={`${item.track.album.name} album cover`}
                      class="mr-4 w-10 h-10"
                    />
                  ) : (
                    <div class="mr-4 w-10 h-10 bg-stone-600 flex justify-center items-center">
                      <img src={Music} alt="Music icon" class="w-4 h-4" />
                    </div>
                  )}
                  <div class="flex flex-col">
                    <div class="font-semibold text-white">{item.track.name}</div>
                    <div class="text-stone-300">
                      {item.track.artists.map((artist) => artist.name).join(', ')}
                    </div>
                  </div>
                </td>
                <td class="px-4 py-2 text-left">_ _ _ _ _</td>
                <td class="px-4 py-2 text-right">{formatDurationMS(item.track.duration_ms)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
