import * as firebase from 'firebase';
import {firebaseConfig} from '../../secret';

let firebaseStorage: firebase.storage.Storage;
let firebaseDatabase: firebase.database.Database;

try {
  if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebaseStorage = firebase.storage();
    firebaseDatabase = firebase.database();
  }
} catch (error) {
  console.log('firebase error:', error);
}

export {firebase, firebaseDatabase, firebaseStorage};
