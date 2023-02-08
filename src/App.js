import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
