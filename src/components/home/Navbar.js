import React, { useEffect, useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav class="bg-stone-900 border-gray-200 px-2 sm:px-4 py-2.5 rounded-md">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <div class="flex items-center">
            <img
              src="https://em-content.zobj.net/thumbs/240/apple/325/crystal-ball_1f52e.png"
              class="h-6 mr-3 sm:h-9"
              alt="aurafy Logo"
            />
            <span class="self-center text-white text-xl font-semibold whitespace-nowrap">
              aurafy
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
            >
              <img
                class="m-1 h-8 w-8 rounded-full"
                src="https://via.placeholder.com/50"
                alt="Profile Picture"
              />
              <p class="m-1.5 font-medium text-white">Bonnie Green</p>
              <svg
                class="w-4 h-4 mr-1"
                aria-hidden="true"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>

            <div
              id="dropdownAvatar"
              className={`z-10 ${
                isOpen ? '' : 'hidden'
              } absolute mt-2 bg-stone-900 divide-y divide-gray-600 rounded-lg shadow w-44`}
              style={{ top: 'calc(100% + 0.5rem)', left: '0' }}
            >
              <div class="px-4 py-3 text-sm text-white">
                <div>Bonnie Green</div>
                <div class="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul class="py-2 text-sm text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                    Earnings
                  </a>
                </li>
              </ul>
              <div class="py-2">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
