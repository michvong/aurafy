import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserPlaylistsContext } from '../../contexts/UserPlaylists';

export default function Sidebar() {
  const navigate = useNavigate();
  const { userPlaylists } = useContext(UserPlaylistsContext);

  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        class="top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-screen px-3 py-4 bg-stone-900">
          <ul class="space-y-2">
            <li>
              <button
                onClick={() => navigate('/home')}
                class="flex items-center w-full p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-stone-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="white"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <span class="ml-3 text-white">Home</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/home')}
                class="flex items-center w-full p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-stone-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="white"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                  />
                </svg>

                <span class="ml-3 text-white">Palette Score</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate('/home')}
                class="flex items-center w-full p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-stone-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>

                <span class="ml-3 text-white">About</span>
              </button>
            </li>
          </ul>

          <hr class="h-px my-3 bg-stone-600 border-0" />

          <span class="ml-1 mb-2 text-sm text-white font-extrabold">PLAYLISTS</span>

          <div class="overflow-y-auto max-h-[530px]">
            <ul>
              {userPlaylists.map((playlist) => (
                <li key={playlist.id}>
                  <button
                    onClick={() => navigate(`/${playlist.id}`)}
                    class="flex items-center w-full py-2 text-sm font-normal text-gray-900 rounded-lg transition ease-in-out delay-120 hover:bg-stone-800 duration-150"
                  >
                    <span class="ml-1 text-white">{playlist.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
