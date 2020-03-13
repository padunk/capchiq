/**
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import * as firebase from 'firebase';

import Loading from './components/Loading/Loading';
import AuthStack from './components/AuthStack/AuthStack';
import AppTab from './components/AppTab/AppTab';

const firebaseConfig = {
  apiKey: 'AIzaSyB36R8p5HVO7CH7ZHyx52AKVCh_PXlHxdc',
  authDomain: 'capchiq.firebaseapp.com',
  databaseURL: 'https://capchiq.firebaseio.com',
  projectId: 'capchiq',
  storageBucket: 'capchiq.appspot.com',
  messagingSenderId: '207415477786',
  appId: '1:207415477786:web:5a254bf3c0a7d19075f3a3',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(usr => {
      if (usr) {
        setUser[usr];
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
