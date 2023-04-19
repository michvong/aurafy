import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserInfoContext = React.createContext();

const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState({
    userIcon: null,
    username: null,
    email: null,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.getUserInfo();
        updateUserInfo({
          userIcon: response.data.images?.[0]?.url,
          username: response.data.display_name,
          email: response.data.email,
        });
      } catch (err) {
        // console.log('User is not logged in');
      }
    };

    fetchUserInfo();
  }, []);

  const updateUserInfo = (newInfo) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      ...newInfo,
    }));
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, updateUserInfo }}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoContext, UserInfoProvider };
