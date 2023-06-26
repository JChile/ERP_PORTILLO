import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [authTokens, setauthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setuser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  // navigate
  const navigate = useNavigate();

  const loginUser = async ({ dni, password }) => {
    const ENDPOINT = "http://127.0.0.1:8000/auth/token/";
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { dni, password },
    });

    const data = await response.json();

    if (response.status == 200) {
      const payloadUser = jwt_decode(data.access);
      const { idArea } = payloadUser;

      setauthTokens(data);
      setuser(payloadUser);
      localStorage.setItem("authTokens", JSON.stringify(data));
      // condicional module
      switch (idArea) {
        // case rrhh
        case 1:
          navigate("/rrhh");
          break;
        // other, navigate to login
        default:
          navigate("/login");
      }
    }
  };

  const logoutUser = () => {
    setauthTokens(null);
    setuser(null);
    localStorage.removeItem("authTokens");
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
