// utils/authContext.js
import React, { createContext, useState } from "react";

// Create a context with default value false (not logged in)
const data = JSON.parse(localStorage.getItem("data"));
const status = data ? true : false;

console.log(status);

export const AuthContext = createContext({
  isLogin: status,
  setIsLogin: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(status);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
