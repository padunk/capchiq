import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/storage';
import {firebaseConfig} from '../../secret';

let firebaseStorage: firebase.storage.Storage;
let firebaseDatabase: firebase.database.Database;
let firebaseFunctions: firebase.functions.Functions;

try {
  if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebaseStorage = firebase.storage();
    firebaseDatabase = firebase.database();
    firebaseFunctions = firebase.functions();
  }
} catch (error) {
  console.log('firebase error:', error);
}

export {firebase, firebaseDatabase, firebaseFunctions, firebaseStorage};
