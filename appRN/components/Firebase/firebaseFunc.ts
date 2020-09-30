import {firebaseDatabase} from './Firebase';

export async function saveNewUserData(user: firebase.User) {
  try {
    await firebaseDatabase.ref('users/' + user.uid).set({
      userName: user.displayName,
      avatar: '',
      // settings: [],
      // idols: [],
      // fans: [],
    });

    await firebaseDatabase.ref('follows/' + user.uid).set({
      followID: [user.uid],
      // followerID: []
    });
  } catch (error) {
    console.log(error);
  }
}

export async function saveVideoData(
  filename: string,
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
    await firebaseDatabase
      .ref('videos/' + ownerID)
      .child(filename)
      .set({
        title,
        uri,
        timestamp,
        likeCount,
      });
  } catch (error) {
    console.log(error);
  }
}
