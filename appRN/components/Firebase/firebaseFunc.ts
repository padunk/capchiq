import {firebaseDatabase} from './Firebase';

export async function saveNewUserData(user: firebase.User) {
  try {
    // set public data
    await firebaseDatabase
      .ref('users/' + user.uid)
      .child('public')
      .set({
        userName: user.displayName,
        avatar: user.photoURL,
        createdAt: user.metadata.creationTime,
        updatedAt: user.metadata.creationTime,
        idolsCount: 0,
        fansCount: 0,
      });

    // set private data
    await firebaseDatabase
      .ref('users/' + user.uid)
      .child('private')
      .set({
        email: user.email,
        lastLogin: user.metadata.lastSignInTime,
        phoneNumber: user.phoneNumber,
        other: user.multiFactor.enrolledFactors,
        createdAt: user.metadata.creationTime,
        updatedAt: user.metadata.creationTime,
        // settings: {},
      });

    // set first follow which is themselves, so user can see their own post later
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
        filename,
        title,
        uri,
        timestamp,
        likeCount,
      });
  } catch (error) {
    console.log(error);
  }
}
