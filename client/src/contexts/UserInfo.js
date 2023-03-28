import React, { useState } from 'react';

const UserInfoContext = React.createContext();

const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState({
    userIcon: null,
    username: null,
    email: null,
  });

  const updateUserInfo = (newInfo) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...newInfo }));
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, updateUserInfo }}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoContext, UserInfoProvider };
