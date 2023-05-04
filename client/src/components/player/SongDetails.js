import React, { useState, useEffect } from 'react';
import Music from '../../assets/music.svg';
import api from '../../services/api';
import { usePlaybackState, usePlayerDevice } from 'react-spotify-web-playback-sdk';

export default function SongDetails() {
  const [currentImage, setCurrentImage] = useState();
  const [currentSong, setCurrentSong] = useState('Song Title');
  const [currentArtists, setCurrentArtists] = useState([]);

  const playbackState = usePlaybackState();
  const device = usePlayerDevice();

  useEffect(() => {
    const fetchCurrentPlaybackState = async () => {
      try {
        const response = await api.getCurrentPlaybackState();
        // console.log(response);
        if (playbackState && response.data.device.id === device?.device_id) {
          setCurrentImage(playbackState.track_window.current_track.album.images[0].url);
          setCurrentSong(playbackState.track_window.current_track.name);
          setCurrentArtists(playbackState.track_window.current_track.artists);
        } else {
          setCurrentImage('');
          setCurrentSong('Song Title');
          setCurrentArtists([]);
        }
      } catch (err) {
        // console.log(err);
      }
    };

    fetchCurrentPlaybackState();
  }, [device?.device_id, playbackState]);

  return (
    <>
      <div class="flex items-center">
        {currentImage ? (
          <>
            <img
              src={currentImage}
              class="rounded-sm max-w-12 max-h-12 bg-stone-500 mr-4"
              alt="Playlist image"
            />
          </>
        ) : (
          <div class="rounded-sm w-16 h-16 bg-stone-600 flex justify-center items-center mr-4">
            <img src={Music} alt="Music icon" style={{ width: '50%', height: '50%' }} />
          </div>
        )}
        <div class="flex flex-col">
          <span class="text-white text-sm text-base">{currentSong}</span>
          <span class="text-gray-400 text-sm">
            {currentArtists.map((artist) => artist.name).join(', ')}
          </span>
        </div>
      </div>
    </>
  );
}
