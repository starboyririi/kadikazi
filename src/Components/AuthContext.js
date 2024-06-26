import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [userType, setUserType] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [Email, setEmailAddress] = useState('');

  const login = (userType, Email) => {
    setAuth(true);
    setUserType(userType);
    setEmailAddress(Email);
    setCurrentUser(currentUser);
  };

  const logout = () => {
    setAuth(false);
    setUserType('');
    setEmailAddress('');
    setCurrentUser('');
  };

  return (
    <AuthContext.Provider value={{ auth, setUserType, userType, setEmailAddress, Email, currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
