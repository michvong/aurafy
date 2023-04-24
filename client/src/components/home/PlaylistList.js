import React, { useContext } from 'react';
import { UserPlaylistsContext } from '../../contexts/UserPlaylists';
import PlaylistItem from './PlaylistItem';

export default function PlaylistList() {
  const { userPlaylists } = useContext(UserPlaylistsContext);

  return (
    <>
      <div class="block max-w-full p-10 bg-stone-800">
        <span class="text-3xl font-extrabold tracking-tight text-white">Your playlists</span>
        <div class="flex mt-6 justify-evenly grid grid-rows-3 grid-flow-col gap-y-8 gap-x-6">
          {userPlaylists.map((playlist) => (
            <PlaylistItem playlistId={playlist.id} key={playlist.id} />
          ))}
        </div>
      </div>
    </>
  );
}
