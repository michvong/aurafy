import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserInfoProvider } from './contexts/UserInfo';
import { UserPlaylistsProvider } from './contexts/UserPlaylists';

import Home from './components/home/Welcome';
import NavBar from './components/generic/Navbar';
import Sidebar from './components/generic/Sidebar';
import PlaylistItem from './components/home/PlaylistItem';
import Playlist from './components/playlist/Playlist';

function App() {
  return (
    <UserInfoProvider>
      <UserPlaylistsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="home" element={<Home />}></Route>
            <Route path="navbar" element={<NavBar />}></Route>
            <Route path="sidebar" element={<Sidebar />}></Route>
            <Route path="playlist-item" element={<PlaylistItem />}></Route>
            <Route path="playlist" element={<Playlist />}></Route>
          </Routes>
        </BrowserRouter>
      </UserPlaylistsProvider>
    </UserInfoProvider>
  );
}

export default App;
