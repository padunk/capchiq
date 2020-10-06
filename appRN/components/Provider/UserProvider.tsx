import React, {createContext, useState} from 'react';

type UserProviderType = {
  userID: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserProviderType>({
  userID: '',
  setUserID: () => {},
});

function UserProvider({children}: any) {
  const [userID, setUserID] = useState<string>('');

  const userValue: UserProviderType = {
    userID,
    setUserID,
  };

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
