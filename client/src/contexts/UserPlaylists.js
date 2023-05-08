import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserPlaylistsContext = React.createContext();

const UserPlaylistsProvider = (props) => {
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        const response = await api.getUserPlaylists();
        updateUserPlaylists(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserPlaylists();
  }, []);

  const updateUserPlaylists = (newPlaylists) => {
    setUserPlaylists(newPlaylists);
  };

  return (
    <UserPlaylistsContext.Provider value={{ userPlaylists, updateUserPlaylists }}>
      {props.children}
    </UserPlaylistsContext.Provider>
  );
};

export { UserPlaylistsContext, UserPlaylistsProvider };
