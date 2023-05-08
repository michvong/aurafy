import React, { useState, useEffect } from 'react';
import { usePlayerDevice, usePlaybackState } from 'react-spotify-web-playback-sdk';
import { formatDurationMS } from '../../services/formatDurationMS';
import api from '../../services/api';
import Music from '../../assets/music.svg';
import Alert from './Alert';

export default function Tracklist({ playlist, playlistPalettes, setCurrentTrackPalette }) {
  let trackNumberCounter = 1;
  const [isLocalTrack, setIsLocalTrack] = useState(false);

  const playerDevice = usePlayerDevice();
  const playbackState = usePlaybackState();

  console.log(playlistPalettes);

  useEffect(() => {
    const currentTrackId = playbackState?.track_window.current_track.id;
    const trackIdx = playlist.tracks.items.findIndex((track) => track.track.id === currentTrackId);
    setCurrentTrackPalette(playlistPalettes[trackIdx]);
    // console.log(playlistPalettes[trackIdx]);
  }, [
    playbackState?.track_window.current_track.id,
    playlist.tracks.items,
    playlistPalettes,
    setCurrentTrackPalette,
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsLocalTrack(false);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isLocalTrack]);

  const checkIsLocalTrack = async (trackUri) => {
    const isLocalTrackUri = /^spotify:local:.*$/.test(trackUri);
    if (isLocalTrackUri) {
      setIsLocalTrack(true);
      console.log(`Cannot play local track URI: ${trackUri}`);
      return;
    }
  };

  const handlePlayTrack = async (contextUri, trackUri, deviceId) => {
    checkIsLocalTrack(trackUri);
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
            {playlist.tracks.items.map((item, trackIdx) => (
              <tr
                key={item.track.id || trackIdx}
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
                <td class="px-4 py-2">
                  <div class="flex flex-row justify-start">
                    {playlistPalettes[trackIdx] ? (
                      <div className="flex flex-row justify-start">
                        {playlistPalettes[trackIdx].map((colours, colourIdx) => (
                          <div
                            key={colourIdx}
                            className="w-2 h-2 mr-1"
                            style={{ backgroundColor: colours }}
                          ></div>
                        ))}
                      </div>
                    ) : (
                      <div>_ _ _ _ _</div>
                    )}
                  </div>
                </td>
                <td class="px-4 py-2 text-right">{formatDurationMS(item.track.duration_ms)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
