import React, {useState, createContext} from 'react';
import * as firebase from 'firebase';

export const AuthContext = createContext({
  user: null,
  firebaseErrorMessage: null,
  register: () => {},
  login: () => {},
  logout: () => {},
});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [resetPasswordError, setResetPasswordError] = useState(null);

  const initialProviderValue = {
    user,
    setUser,
    loginError,
    registerError,
    setLoginError,
    setRegisterError,
    resetPasswordError,
    register: (name, email, password) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          // AsyncStorage.setItem('user', JSON.stringify(userCredentials));
          setUser(email);
          return userCredentials.user.updateProfile({
            displayName: name.trim(),
          });
        })
        .catch(error => setRegisterError(error.message));
    },
    login: (email, password) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => setUser(email))
        .catch(error => setLoginError(error.message));
      // AsyncStorage.setItem('user', JSON.stringify())
    },
    logout: () => {
      setUser(null);
      // AsyncStorage.removeItem('user');
      firebase.auth().signOut();
    },
    resetPassword: (email, onSuccess) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function() {
          console.log('reset password email sent.');
          setResetPasswordError('Reset password email sent.');
          let timeout = setTimeout(onSuccess, 3000);
          // onSuccess();
        })
        .catch(error => setResetPasswordError(error.message));
    },
  };

  return (
    <AuthContext.Provider value={initialProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
