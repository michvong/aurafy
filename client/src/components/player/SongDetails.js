import React, { useState, useEffect } from 'react';
import Music from '../../assets/music.svg';

export default function SongDetails() {
  const [currentImage, setCurrentImage] = useState();
  const [currentSong, setCurrentSong] = useState('Song Title');
  const [currentArtist, setCurrentArtist] = useState('Artist');

  return (
    <>
      <div class="flex items-center">
        {currentImage ? (
          <>
            <img
              src={currentImage}
              class="rounded-sm max-w-16 max-h-16 bg-stone-500 mr-4"
              alt="Playlist image"
            />
          </>
        ) : (
          <div class="rounded-sm w-16 h-16 bg-stone-600 flex justify-center items-center mr-4">
            <img src={Music} alt="Music icon" style={{ width: '50%', height: '50%' }} />
          </div>
        )}
        <div class="flex flex-col">
          <span class="text-white font-medium text-base">{currentSong}</span>
          <span class="text-gray-400 text-sm">{currentArtist}</span>
        </div>
      </div>
    </>
  );
}
