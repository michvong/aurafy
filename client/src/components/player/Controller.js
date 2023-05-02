import React, { useState, useEffect } from 'react';
import { formatDurationMS } from '../../services/formatDurationMS';
import { useSpotifyPlayer, usePlaybackState } from 'react-spotify-web-playback-sdk';
import api from '../../services/api';

export default function Controller() {
  const [currentDuration, setCurrentDuration] = useState('0:00');
  const [endDuration, setEndDuration] = useState('0:00');
  const [currPositionOnBar, setCurrPositionOnBar] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffleState, setShuffleState] = useState(false);
  const [repeatState, setRepeatState] = useState('off');

  const player = useSpotifyPlayer();
  const playbackState = usePlaybackState({ interval: true });

  useEffect(() => {
    const formattedEndDuration = formatDurationMS(
      playbackState?.track_window?.current_track?.duration_ms || 0
    );
    setEndDuration(formattedEndDuration);

    const formattedCurrentDuration = formatDurationMS(playbackState?.position || 0);
    setCurrentDuration(formattedCurrentDuration);

    const currentDurationMS = playbackState?.position;
    const endDurationMS = playbackState?.track_window?.current_track?.duration_ms;

    setCurrPositionOnBar((currentDurationMS / endDurationMS) * 100);
    console.log(playbackState);
  }, [playbackState]);

  useEffect(() => {
    if (playbackState?.paused) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [playbackState]);

  const handleDurationChange = (event) => {
    if (playbackState !== null) {
      const newPosition = event.target.value;

      const endDurationMS = playbackState?.track_window?.current_track?.duration_ms;
      const seekDuration = (newPosition / 100) * endDurationMS;
      const formattedSeekDuration = formatDurationMS(seekDuration);

      setCurrentDuration(formattedSeekDuration);
      player.seek(seekDuration);
    }
  };

  const handleShuffleState = async () => {
    if (shuffleState) {
      setShuffleState(false);
      await api.setShuffleState(false);
    } else {
      setShuffleState(true);
      await api.setShuffleState(true);
    }
  };

  const handleRepeatState = () => {
    if (repeatState === 'off') {
      setRepeatState('context');
      api.setRepeatMode('context');
    } else if (repeatState === 'context') {
      setRepeatState('track');
      api.setRepeatMode('track');
    } else {
      setRepeatState('off');
      api.setRepeatMode('off');
    }
  };

  return (
    <>
      <div class="flex flex-col items-center">
        <div class="flex items-center -mb-3">
          <button onClick={handleShuffleState} class="p-6 hover:scale-125 focus:scale-95">
            {!shuffleState ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="stroke-green-500"
              >
                <path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5" />
              </svg>
            )}
          </button>

          <button onClick={() => player.previousTrack()} class="p-3 hover:scale-110 focus:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
              stroke="#ffffff"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="hover:fill-current hover:text-green-500"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>

          {isPlaying ? (
            <button onClick={() => player.togglePlay()} class="p-3 hover:scale-110 focus:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="10" y1="15" x2="10" y2="9"></line>
                <line x1="14" y1="15" x2="14" y2="9"></line>
              </svg>
            </button>
          ) : (
            <button onClick={() => player.togglePlay()} class="p-3 hover:scale-110 focus:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
            </button>
          )}

          <button onClick={() => player.nextTrack()} class="p-3 hover:scale-110 focus:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
              stroke="#ffffff"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="hover:fill-current hover:text-green-500"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>

          <button onClick={handleRepeatState} class="p-6 hover:scale-125 focus:scale-95">
            {repeatState === 'off' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M17 2.1l4 4-4 4" />
                <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
                <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
              </svg>
            )}
            {repeatState === 'context' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="stroke-green-500"
              >
                <path d="M17 2.1l4 4-4 4" />
                <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
                <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
              </svg>
            )}
            {repeatState === 'track' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="stroke-green-500"
              >
                <path d="M17 2.1l4 4-4 4" />
                <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
                <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
                <text
                  x="50%"
                  y="62%"
                  text-anchor="middle"
                  class="fill-green-500 text-[8px] font-thin"
                >
                  1
                </text>
              </svg>
            )}
          </button>
        </div>

        <div class="flex flex-row items-center">
          <span class="text-white text-xs">{currentDuration}</span>
          <div class="mx-2 w-96 h-6 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={String(currPositionOnBar)}
              onChange={handleDurationChange}
              class="w-full h-full absolute opacity-0 cursor-pointer z-10"
              id="duration-bar"
            />
            <div class="bg-gray-500 w-full h-1 absolute top-1/2 left-0 rounded-full transform -translate-y-1/2">
              <div
                class="bg-white h-full rounded-full"
                style={{ width: `${currPositionOnBar}%` }}
              ></div>
              <div
                class="absolute w-3 h-3 bg-white rounded-full shadow-lg -top-1 left-1 transform -translate-x-1/2 cursor-pointer "
                style={{ transform: `translateX(-50%)`, left: `${currPositionOnBar}%` }}
                draggable="false"
              ></div>
            </div>
          </div>
          <span class="text-white text-xs">{endDuration}</span>
        </div>
      </div>
    </>
  );
}
