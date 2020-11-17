import React, {createContext, useState} from 'react';
import {VideoData} from '../../Types/types';

type VideoProviderType = {
  videoDetail: VideoData | null;
  setvideoDetail: React.Dispatch<React.SetStateAction<VideoData | null>>;
};

export const VideoContext = createContext<VideoProviderType>({
  videoDetail: null,
  setvideoDetail: () => {},
});

function VideoProvider({children}: {children: React.ReactNode}) {
  const [videoDetail, setvideoDetail] = useState<VideoData | null>(null);

  const videoValue: VideoProviderType = {
    videoDetail,
    setvideoDetail,
  };

  return (
    <VideoContext.Provider value={videoValue}>{children}</VideoContext.Provider>
  );
}

export default VideoProvider;
