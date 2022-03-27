/**
 * This represents some generic auth provider API, like Firebase.
 */
import React from 'react'

let AuthContext = React.createContext(null);

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

function useAuth() {
  return React.useContext(AuthContext);
}

export { fakeAuthProvider, useAuth, AuthContext };