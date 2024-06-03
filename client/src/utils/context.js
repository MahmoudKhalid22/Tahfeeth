// utils/authContext.js
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";

// Create a context with default value false (not logged in)

const accessToken = Cookies.get("accessToken");
let status = false;
if (accessToken) {
  status = true;
}

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
