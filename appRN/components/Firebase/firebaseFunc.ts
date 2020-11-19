import {UserData} from '../../Types/types';
import {firebaseDatabase} from './Firebase';
import {v4 as uuidv4} from 'uuid';

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
  const videoID = uuidv4();

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
        likeCount,
        ownerID,
        timestamp,
        title,
        uri,
        videoID,
      });
    await firebaseDatabase.ref('likes/' + videoID).set({
      [ownerID]: false,
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

export const getAuthUserData = async (id: string): Promise<any> => {
  const data: UserData = {} as UserData;
  try {
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
  } catch (error) {
    console.log('error', error);
  }
};

export const checkLike = async (videoID: string, userID: string) => {
  try {
    const data = await firebaseDatabase
      .ref('likes/' + videoID)
      .child(userID)
      .once('value');
    return await data.exportVal();
  } catch (error) {
    console.log('error checkLike :>> ', error);
    throw new Error(error);
  }
};

export const likeUnlikeVideo = async (videoID: string, userID: string) => {
  try {
    const isLike = await checkLike(videoID, userID);
    const likeRef = firebaseDatabase.ref('likes/' + videoID);

    if (isLike === null) {
      await likeRef.set({
        [userID]: true,
      });
    } else if (isLike === false) {
      await likeRef.update({
        [userID]: true,
      });
    } else {
      await likeRef.update({
        [userID]: false,
      });
    }
  } catch (error) {
    console.log('error firebaseFunc 162', error);
    throw new Error(error);
  }
};
