import {firebaseDatabase} from '../components/Firebase/Firebase';
import {IdolVideoPost} from '../Types/types';

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
    idolSnapshots.forEach((idol, idx) => {
      const videoObj = videoSnapshots[idx].val();
      const videoKey = Object.keys(videoObj)[0];
      const video = videoObj[videoKey!];

      result.push({user: idol.val(), video});
    });

    return result;
  } catch (error) {
    throw new Error('');
  }
};

export const dataAPI = {
  getAllIdolVideos,
};
