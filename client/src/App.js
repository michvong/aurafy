import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserInfoProvider } from './contexts/UserInfo';
import { UserPlaylistsProvider } from './contexts/UserPlaylists';

import Home from './pages';
import Welcome from './components/home/Welcome';
import NavBar from './components/generic/Navbar';
import Sidebar from './components/generic/Sidebar';
import PlaylistItem from './components/home/PlaylistItem';
import PlaylistList from './components/home/PlaylistList';
import Playlist from './components/playlist/Playlist';
import Player from './components/player/Player';

function App() {
  return (
    <UserInfoProvider>
      <UserPlaylistsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="home" element={<Home />}></Route>
            <Route path=":playlistId" element={<Home />}></Route>
            {/* <Route path="welcome" element={<Welcome />}></Route>
            <Route path="navbar" element={<NavBar />}></Route>
            <Route path="sidebar" element={<Sidebar />}></Route>
            <Route path="playlist-list" element={<PlaylistList />}></Route>
            <Route path="playlist-item" element={<PlaylistItem />}></Route>
            <Route path="playlist" element={<Playlist />}></Route>
            <Route path="player" element={<Player />}></Route> */}
          </Routes>
        </BrowserRouter>
      </UserPlaylistsProvider>
    </UserInfoProvider>
  );
}

export default App;
