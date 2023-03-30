import React, { useState } from 'react';

const UserPlaylistsContext = React.createContext();

const UserPlaylistsProvider = (props) => {
  const [userPlaylists, setUserPlaylists] = useState([]);

  const updateUserPlaylists = (newInfo) => {
    console.log('updating user playlists: ' + newInfo);
    setUserPlaylists((prevUserPlaylists) => ({ ...prevUserPlaylists, ...newInfo }));
  };

  return (
    <UserPlaylistsContext.Provider value={{ userPlaylists, updateUserPlaylists }}>
      {props.children}
    </UserPlaylistsContext.Provider>
  );
};

export { UserPlaylistsContext, UserPlaylistsProvider };
