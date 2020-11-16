import React, {useState, createContext} from 'react';
import * as firebase from 'firebase';
import {NativeSyntheticEvent, NativeTouchEvent} from 'react-native';
import {getAuthUserData, saveNewUserData} from '../Firebase/firebaseFunc';
import {UserData} from '../../Types/types';
// import AsyncStorage from '@react-native-community/async-storage';

type SyntheticEvent = (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;

interface Provider {
  user: UserData | null;
  loginError: string | null;
  registerError: string | null;
  resetPasswordMessage: string | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  setLoginError: React.Dispatch<React.SetStateAction<string | null>>;
  setRegisterError: React.Dispatch<React.SetStateAction<string | null>>;
  register: Function;
  login: Function;
  logout: SyntheticEvent;
  resetPassword: Function;
}

export const AuthContext = createContext<Provider>({
  user: null,
  loginError: null,
  registerError: null,
  resetPasswordMessage: null,
  setUser: () => {},
  setLoginError: () => {},
  setRegisterError: () => {},
  register: () => {},
  login: () => {},
  logout: (ev: NativeSyntheticEvent<NativeTouchEvent>): void => {},
  resetPassword: () => {},
});

function AuthProvider({children}: any) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [resetPasswordMessage, setResetPasswordMessage] = useState<
    string | null
  >(null);

  const initialProviderValue = {
    user,
    setUser,
    loginError,
    registerError,
    setLoginError,
    setRegisterError,
    resetPasswordMessage,
    register: (name: string, email: string, password: string) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials: firebase.auth.UserCredential) => {
          // AsyncStorage.setItem('user', JSON.stringify(userCredentials));
          if (userCredentials.user === null) {
            throw new Error('user not found');
          }
          getAuthUserData(userCredentials.user.uid)
            .then((data) => setUser(data))
            .catch((error) => {
              throw new Error(error);
            });

          saveNewUserData(userCredentials.user);
          return userCredentials.user.updateProfile({
            displayName: name.trim(),
          });
        })
        .catch((error) => setRegisterError(error.message));
    },
    login: (email: string, password: string) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials: firebase.auth.UserCredential) => {
          if (userCredentials.user)
            getAuthUserData(userCredentials.user?.uid)
              .then((data) => setUser(data))
              .catch((error) => {
                throw new Error(error);
              });
          // AsyncStorage.setItem('user', JSON.stringify())
        })
        .catch((error) => setLoginError(error.message));
    },
    logout: () => {
      setUser(null);
      // AsyncStorage.removeItem('user');
      firebase.auth().signOut();
    },
    resetPassword: (email: string, onSuccess: Function) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          console.log('reset password email sent.');
          setResetPasswordMessage('Reset password email sent.');
        })
        .catch((error) => setResetPasswordMessage(error.message));
    },
  };

  return (
    <AuthContext.Provider value={initialProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
