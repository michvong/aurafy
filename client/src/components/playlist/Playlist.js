import React, { useState, useEffect } from 'react';
import Tracklist from './Tracklist';
import api from '../../services/api';
import colours from '../../services/colours';
import Loading from '../generic/Loading';

export default function Playlist({ playlistId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [playlistColour, setPlaylistColour] = useState('');

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await api.getPlaylist(playlistId);
        setPlaylist(response.data);

        const totalDuration = response.data.tracks.items.reduce((acc, item) => {
          return acc + item.track.duration_ms;
        }, 0);
        setTotalDuration(formatDuration(totalDuration));

        colours
          .getDominantColour(response.data.images[0].url)
          .then((dominantColour) => {
            console.log(dominantColour);
            setPlaylistColour(dominantColour);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchPlaylist();
  }, [playlistId]);

  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    } else if (hours < 1) {
      return `${minutes} min ${seconds} sec`;
    } else {
      return `${seconds} sec`;
    }
  };

  if (isLoading) {
    return (
      <div class="flex justify-center items-center pb-24 overflow-hidden overscroll-none bg-stone-800 h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div
        className={`block max-w-full p-10 ${
          playlistColour
            ? `bg-gradient-to-b from-[${playlistColour}] from-10% via-stone-800 via-30% to-stone-800`
            : 'bg-gradient-to-b from-stone-200 from-10% via-stone-800 via-30% to-stone-800'
        } shadow`}
      >
        <div class="flex items-center mb-6">
          <img
            src={playlist?.images[0].url}
            alt={`${playlist?.name} playlist cover`}
            class="mr-8 w-1/6 h-1/6"
          />
          <div class="flex flex-col space-y-8">
            <span class="text-7xl font-extrabold tracking-tight text-white">{playlist?.name}</span>
            <div class="flex flex-col space-y-1">
              <span class="font-normal text-stone-200">{playlist?.description}</span>
              <span class="text-sm font-semibold tracking-tight text-white">
                By {playlist?.owner.display_name} •
                <span class="font-medium"> {playlist?.tracks.total} songs, </span>
                <span class="text-stone-200 font-normal">{totalDuration}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-b from-stone-800/50 from-20% via-stone-800/50 via-30% to-stone-800">
          <Tracklist playlistId={playlistId} />
        </div>
      </div>
    </div>
  );
}
