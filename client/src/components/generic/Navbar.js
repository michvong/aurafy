import React, { useState, useContext } from 'react';
import { UserInfoContext } from '../../contexts/UserInfo';
import LoginButton from '../generic/Login';
import LogoutButton from '../generic/Logout';
import Navigation from '../generic/Navigation';

export default function NavBar({ navigationHidden }) {
  const { userInfo } = useContext(UserInfoContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav class="top-0 bg-stone-900 border-b border-stone-700 px-3 py-1 w-full">
        <div class="flex flex-row justify-between items-center">
          {navigationHidden ? (
            <div class="flex items-center">
              <img
                src="https://em-content.zobj.net/thumbs/240/apple/325/crystal-ball_1f52e.png"
                class="max-h-6 mr-3"
                alt="aurafy Logo"
              />
              <span class="self-center text-xl font-semibold whitespace-nowrap text-white">
                aurafy
              </span>
              <div class="invisible">
                <Navigation />
              </div>
            </div>
          ) : (
            <Navigation />
          )}

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center text-sm p-1 border-2 border-transparent bg-stone-900 rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
            >
              <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                {userInfo?.userIcon ? (
                  <img
                    class="h-full w-full rounded-full"
                    src={userInfo.userIcon}
                    alt="Profile Picture"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                )}
              </div>
              <p className="mx-2 font-medium text-white">
                {userInfo?.username ? userInfo.username : 'Guest'}
              </p>
              <svg
                className="w-4 h-4 mr-1"
                aria-hidden="true"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <div
              id="dropdownAvatar"
              className={`z-10 ${
                isOpen ? '' : 'hidden'
              } absolute mt-2 bg-stone-900 divide-y divide-gray-600 rounded-lg shadow w-44`}
              style={{ top: 'calc(100% + 0.5rem)', right: '0' }}
            >
              <div class="px-4 py-3 text-sm text-white">
                <div>{userInfo?.username ? userInfo.username : 'Guest'}</div>
                <div class="text-xs truncate">{userInfo?.email}</div>
              </div>
              <ul class="py-2 text-sm text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                    About
                  </a>
                </li>
              </ul>
              <div class="py-2">{userInfo?.username ? <LogoutButton /> : <LoginButton />}</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
