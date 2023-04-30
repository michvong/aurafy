import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Music from '../../assets/music.svg';
import api from '../../services/api';

export default function PlaylistItem({ playlistId }) {
  const [playlistImage, setPlaylistImage] = useState();
  const [playlistName, setPlaylistName] = useState('Playlist name');
  const [playlistDesc, setPlaylistDesc] = useState('Playlist description');
  const [playlistPalette, setPlaylistPalette] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await api.getPlaylist(playlistId);
        console.log(response);
        setPlaylistName(response.data.name);
        setPlaylistImage(response.data.images[0].url);
        // setPlaylistDesc(response.data.description);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  return (
    <div onClick={() => navigate(`/${playlistId}`)}>
      <div class="relative flex flex-col flex-none items-center justify-items-center content-center block pb-10 bg-stone-700 rounded-md shadow transition ease-in-out delay-120 hover:bg-stone-500 duration-150">
        <div class="flex justify-center content-center relative">
          {playlistImage ? (
            <>
              <img
                src={playlistImage}
                class="rounded-t-md w-36 h-36 bg-stone-500"
                alt="Playlist image"
              />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                <button class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white transition ease-in-out delay-120 hover:-translate-y-1 hover:scale-110 duration-150">
                  <svg
                    class="w-4 h-4"
                    fill="white"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div class="rounded-t-md w-36 h-36 bg-stone-600 flex justify-center items-center">
              <img src={Music} alt="Music icon" style={{ width: '50%', height: '50%' }} />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                <button class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white transition ease-in-out delay-120 hover:-translate-y-1 hover:scale-110 duration-150">
                  <svg
                    class="w-4 h-4"
                    fill="white"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <p class="text-center w-36 truncate mt-2 text-base font-bold tracking-tight text-white">
          {playlistName}
        </p>
      </div>
    </div>
  );
}
