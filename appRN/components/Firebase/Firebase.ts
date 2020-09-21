import * as firebase from 'firebase';
import {firebaseConfig} from '../../secret';

try {
  if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
} catch (error) {
  console.log('firebase error:', error);
}

export default firebase;
