// utils/authContext.js
import React, { createContext, useState } from "react";

// Create a context with default value false (not logged in)
export const AuthContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
