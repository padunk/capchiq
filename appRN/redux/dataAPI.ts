import {firebaseDatabase} from '../components/Firebase/Firebase';
import {IdolVideoPost, VideoData} from '../Types/types';
import {v4 as uuidv4} from 'uuid';

async function saveVideo(
  filename: string,
  ownerID: string,
  uri: string,
  title = '',
  likeCount = 0,
): Promise<any> {
  const timestamp = new Date().getTime();
  const videoID = uuidv4();

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

    // create likes table
    await firebaseDatabase.ref('likes/' + videoID).set({
      [ownerID]: false,
    });

    // create notifications table
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const getAllIdolVideos = async (userID: string): Promise<IdolVideoPost[]> => {
  try {
    const followIdolID = await firebaseDatabase
      .ref('/follows/' + userID)
      .child('followID')
      .limitToFirst(20)
      .once('value');
    // turn it into an array ['id-1', 'id-2', ...]
    const followIdolArray: string[] = Object.entries(followIdolID.val())
      .filter((ar) => ar[1])
      .map((id) => id[0]);

    // get idols public data
    const followIdolData = followIdolArray.map((idol: string) => {
      return firebaseDatabase
        .ref('/users/' + idol)
        .child('public')
        .once('value');
    });
    const idolSnapshots: firebase.database.DataSnapshot[] = await Promise.all(
      followIdolData,
    );

    // get two newest videos from idols
    const followIdolVideos = followIdolArray.map((idol: string) => {
      return firebaseDatabase
        .ref('/videos/')
        .child(idol)
        .orderByChild('timestamp')
        .limitToLast(1)
        .once('value');
    });
    const videoSnapshots: firebase.database.DataSnapshot[] = await Promise.all(
      followIdolVideos,
    );

    const result: IdolVideoPost[] = [];
    for (let i = 0; i < idolSnapshots.length; i++) {
      const idol = idolSnapshots[i];
      const videoObj = videoSnapshots[i].val();
      const videoKey = Object.keys(videoObj)[0];
      videoObj[videoKey].likeByThisUser = await checkLike(
        videoObj[videoKey].videoID,
        userID,
      );
      const video = videoObj[videoKey];

      result.push({user: idol.val(), video});
    }

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const checkLike = async (videoID: string, userID: string): Promise<boolean> => {
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

const updateVideoLike = async (
  {likeByThisUser, videoID, ownerID, filename}: VideoData,
  likeByID: string,
): Promise<VideoData> => {
  try {
    // update data on likes table
    const likeRef: firebase.database.Reference = firebaseDatabase.ref(
      `likes/${videoID}`,
    );

    if (likeByThisUser === null) {
      await likeRef.set({
        [likeByID]: true,
      });
    } else if (likeByThisUser === false) {
      await likeRef.update({
        [likeByID]: true,
      });
    } else {
      await likeRef.update({
        [likeByID]: false,
      });
    }

    // update data on videos table
    const likeObj = (await likeRef.once('value')).val();
    const likeValue = Object.values(likeObj);
    const likeCount = likeValue.filter((likes) => likes === true).length;
    const videoRef: firebase.database.Reference = firebaseDatabase
      .ref(`videos/${ownerID}`)
      .child(filename);

    await videoRef.update({
      likeCount,
    });
    const updatedData: VideoData = (await videoRef.once('value')).val();
    updatedData.likeByThisUser = !likeByThisUser;

    return updatedData;
  } catch (error) {
    console.log('error updateVideoLike', error);
    throw new Error(error);
  }
};

const getLikeCount = async ({
  filename,
  ownerID,
}: VideoData): Promise<VideoData> => {
  try {
    const response = await firebaseDatabase
      .ref(`videos/${ownerID}`)
      .child(filename)
      .once('value');
    const video = await response.val();
    return video;
  } catch (error) {
    console.log('error getLikeCount :>> ', error);
    throw new Error(error);
  }
};

export const dataAPI = {
  checkLike,
  getAllIdolVideos,
  getLikeCount,
  saveVideo,
  updateVideoLike,
};
