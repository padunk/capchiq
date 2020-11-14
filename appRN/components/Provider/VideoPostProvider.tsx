import React, {createContext} from 'react';

export const VideoContext = createContext({
  userID: null,
});

interface IVideoProviderProps {
  children: React.ReactNode;
}

function VideoProvider({children}: IVideoProviderProps) {
  const userValue = {
    userID: null,
  };

  return (
    <VideoContext.Provider value={userValue}>{children}</VideoContext.Provider>
  );
}

export default VideoProvider;
