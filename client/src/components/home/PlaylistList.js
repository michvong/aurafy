import React, { useContext } from 'react';
import { UserPlaylistsContext } from '../../contexts/UserPlaylists';
import PlaylistItem from './PlaylistItem';

export default function PlaylistList({ onPlaylistClick }) {
  const { userPlaylists } = useContext(UserPlaylistsContext);

  return (
    <>
      <div className="block max-w-full pt-8 pb-16 pl-10 bg-stone-800">
        <span className="text-3xl font-extrabold tracking-tight text-white">Your playlists</span>
        <div className="grid grid-cols-5 gap-x-8 gap-y-8 mt-6">
          {userPlaylists.map((playlist) => (
            <PlaylistItem
              playlistId={playlist.id}
              key={playlist.id}
              onPlaylistClick={onPlaylistClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}
