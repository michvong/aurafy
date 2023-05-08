import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk';
import { UserInfoContext } from '../contexts/UserInfo';
import api from '../services/api';

import Player from '../components/player/Player';
import Guide from '../components/generic/Guide';
import NavBar from '../components/generic/Navbar';
import Sidebar from '../components/generic/Sidebar';
import Welcome from '../components/home/Welcome';
import PlaylistList from '../components/home/PlaylistList';
import Miniplayer from '../components/miniplayer/Miniplayer';
import Playlist from '../components/playlist/Playlist';

export default function Home() {
  const { userInfo, updateUserInfo } = useContext(UserInfoContext);
  const [accessToken, setAccessToken] = useState('');
  const [currentTrackPalette, setCurrentTrackPalette] = useState([]);
  const [onFullPlayer, setOnFullPlayer] = useState(false);
  const { playlistId } = useParams();
  const getOAuthToken = useCallback((callback) => callback(accessToken), [accessToken]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await api.getAccessToken();
        setAccessToken(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <WebPlaybackSDK
      initialDeviceName="aurafy"
      getOAuthToken={getOAuthToken}
      connectOnInitialized={true}
      initialVolume={0.5}
    >
      {onFullPlayer ? (
        <Player currentTrackPalette={currentTrackPalette} setOnFullPlayer={setOnFullPlayer} />
      ) : (
        <div>
          {!userInfo.hasCompletedGuide && <Guide />}
          <div class="flex max-h-screen flex-col overscroll-contain">
            <div class="flex flex-1">
              <div class="z-50 flex flex-col flex-grow">
                <Sidebar />
                <div class="flex-shrink-0 fixed bottom-0 w-full">
                  <Miniplayer setOnFullPlayer={setOnFullPlayer} />
                </div>
              </div>

              <div class="flex flex-col w-full h-screen bg-transparent overflow-y-auto overscroll-contain">
                <div class="mb-12">
                  <div class="sticky top-0 z-50">
                    <NavBar navigationHidden={false} />
                  </div>

                  {playlistId ? (
                    <Playlist
                      playlistId={playlistId}
                      setCurrentTrackPalette={setCurrentTrackPalette}
                      currentTrackPalette={currentTrackPalette}
                    />
                  ) : (
                    <React.Fragment>
                      <Welcome />
                      <PlaylistList />
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </WebPlaybackSDK>
  );
}
