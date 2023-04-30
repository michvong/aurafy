import React, { useState, useContext, useEffect } from 'react';
import { UserInfoContext } from '../../contexts/UserInfo';
import NavBar from '../generic/Navbar';

export default function Landing() {
  return (
    <div>
      <div class="flex flex-col overscroll-none">
        <div class="fixed w-full">
          <NavBar navigationHidden={true} />
        </div>
        <div class="flex flex-col justify-center items-center w-screen h-screen bg-black">
          <p class="mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 animate-gradient-xy bg-clip-text text-transparent text-center text-6xl font-semibold font-mono">
            aurafy
          </p>
          <p class="text-center font-medium text-gray-200">
            'Aurafy' this <span class="text-green-400">environment</span> based on songs in your
            playlists.
          </p>
          <div class="bg-gradient-to-r from-green-500 via-purple-500 to-emerald-500 animate-gradient-xy w-2/3 h-1/6 m-8 rounded-md" />
          <a
            href="/home"
            class="mb-4 text-center text-2xl font-medium text-white group transition duration-300 font-mono"
          >
            {'<'} start here {'>'}
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400"></span>
          </a>
          <a
            href="https://github.com/michvong/"
            class="text-center text-xs font-medium text-gray-400 group transition duration-300"
          >
            Made with ♡ by Michelle Vong
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400"></span>
          </a>
        </div>
      </div>
    </div>
  );
}
