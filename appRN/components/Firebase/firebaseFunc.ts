import {firebaseDatabase} from './Firebase';

export async function saveVideoData(
  id: string,
  ownerID: string,
  uri: string,
  title?: string | null,
  likeCount?: number | null | undefined,
) {
  const timestamp = new Date().getTime();

  if (title === null || title === undefined) {
    title = '';
  }

  if (likeCount === null || likeCount === undefined) {
    likeCount = 0;
  }

  try {
    await firebaseDatabase.ref('videos/' + id).set({
      ownerID,
      title,
      uri,
      timestamp,
      likeCount,
    });
  } catch (error) {
    console.log(error);
  }
}
