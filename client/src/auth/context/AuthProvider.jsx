import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  // estado del token
  const [authTokens, setauthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  // estado de la informacion del usuario
  const [user, setuser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  // hook navegacion
  const navigate = useNavigate();

  // funcion para logearse
  const loginUser = async (dni, password) => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    // ENDOINT AUTENTICACION

    const ENDPOINT = `${DOMAIN}/api/token/`;
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: dni, password: password }),
    });

    const data = await response.json();

    if (response.status == 200) {
      const payloadUser = jwt_decode(data.access);
      const { groupsId } = payloadUser;

      setauthTokens(data);
      setuser(payloadUser);
      localStorage.setItem("authTokens", JSON.stringify(data));

      console.log(groupsId);

      // condicional module
      switch (groupsId) {
        // case rrhh
        case "1":
          navigate("/rrhh");
          break;
        case "2":
          navigate("/marketing");
          break;
        // other, navigate to login
        default:
          navigate("/login");
      }
    }
    if (response.status == 401) {
      return data;
    }
  };

  const logoutUser = () => {
    setauthTokens(null);
    setuser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
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
