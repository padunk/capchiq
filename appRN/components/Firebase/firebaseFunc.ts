import {UserData} from '../../Types/types';
import {firebaseDatabase, firebaseFunctions} from './Firebase';

export async function saveNewUserData(user: firebase.User) {
  try {
    // set public data
    await firebaseDatabase
      .ref('users/' + user.uid)
      .child('public')
      .set({
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: user.metadata.creationTime,
        updatedAt: user.metadata.creationTime,
        idolsCount: 0,
        fansCount: 0,
        id: user.uid,
        bio: '',
        website: '',
      });

    // set private data
    await firebaseDatabase
      .ref('users/' + user.uid)
      .child('private')
      .set({
        email: user.email,
        lastLogin: user.metadata.lastSignInTime,
        phoneNumber: user.phoneNumber,
        mfa: user.multiFactor.enrolledFactors,
        birthDate: '',
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
        ownerID,
      });
  } catch (error) {
    console.log(error);
  }
}

type FollowType = {
  fansID: string;
  idolID: string;
  wantToFollow: boolean;
};

export async function updateFollow({fansID, idolID, wantToFollow}: FollowType) {
  const followRef = firebaseDatabase
    .ref('/follows/' + fansID)
    .child('followID');
  const followerRef = firebaseDatabase
    .ref('/follows/' + idolID)
    .child('followerID');

  try {
    const idolSnapshot: firebase.database.DataSnapshot = await followRef
      .orderByChild(idolID)
      .limitToFirst(1)
      .once('value');

    if (idolSnapshot === null && wantToFollow) {
      // create new row of data
      const newIdol: any = {};
      newIdol[idolID] = true;
      followRef.set(newIdol);
      followerRef.set(newIdol);
    }

    const updates: any = {};
    if (idolSnapshot !== null && wantToFollow) {
      // if data already exist, change the value to true

      updates[idolID] = true;
      followRef.update(updates);
      followerRef.update(updates);
    } else {
      // if data already exist, change the value to false
      updates[idolID] = false;
      followRef.update(updates);
      followerRef.update(updates);
    }
  } catch (error) {
    console.log(error);
  }
}

export const getAuthUserData = async (id: string): Promise<UserData> => {
  const data: UserData = {} as UserData;

  const userPublicData = await firebaseDatabase
    .ref('/users/' + id)
    .child('public')
    .once('value');

  const userPrivateData = await firebaseDatabase
    .ref('/users/' + id)
    .child('private')
    .once('value');

  data.public = userPublicData.exportVal();
  data.private = userPrivateData.exportVal();

  return data;
};
