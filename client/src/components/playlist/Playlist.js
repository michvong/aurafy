import Tracklist from './Tracklist';

export default function Playlist({ playlistId }) {
  return (
    <div>
      <Tracklist playlistId={playlistId} />
    </div>
  );
}
