import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserInfoProvider } from './contexts/UserInfo';
import { UserPlaylistsProvider } from './contexts/UserPlaylists';

import Home from './pages/Home';
import Landing from './pages/Landing';

function App() {
  return (
    <UserInfoProvider>
      <UserPlaylistsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path=":playlistId" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </UserPlaylistsProvider>
    </UserInfoProvider>
  );
}

export default App;
