import React, { useState, useEffect } from 'react';
import { formatDurationMS } from '../../services/formatDurationMS';
import { useSpotifyPlayer, usePlaybackState } from 'react-spotify-web-playback-sdk';

export default function Duration() {
  const [currentDuration, setCurrentDuration] = useState('0:00');
  const [endDuration, setEndDuration] = useState('0:00');
  const [currPositionOnBar, setCurrPositionOnBar] = useState(0);

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
    // console.log(playbackState);
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

  return (
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
  );
}
