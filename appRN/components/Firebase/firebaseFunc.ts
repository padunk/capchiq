import {firebaseDatabase} from './Firebase';

interface IVideoMetadata {
  id: string;
  ownerID: string;
  title: string | null;
  uri: string;
  likeCount?: number | null | undefined;
}

export function saveVideoData({
  id,
  ownerID,
  title,
  uri,
  likeCount,
}: IVideoMetadata) {
  const timestamp = new Date().getTime;

  if (likeCount === null || likeCount === undefined) {
    likeCount = 0;
  }

  firebaseDatabase.ref('videos/' + id).set({
    ownerID,
    title,
    uri,
    timestamp,
    likeCount,
  });
}
