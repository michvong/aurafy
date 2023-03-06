import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/home/Welcome';
import NavBar from './components/home/Navbar';
import Sidebar from './components/home/Sidebar';
import Playlist from './components/home/Playlist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="navbar" element={<NavBar />}></Route>
        <Route path="sidebar" element={<Sidebar />}></Route>
        <Route path="playlist" element={<Playlist />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
