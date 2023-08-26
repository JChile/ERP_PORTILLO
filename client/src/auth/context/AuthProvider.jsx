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

  const [permissions, setPermissions] = useState([]);

  // hook navegacion
  const navigate = useNavigate();

  // funcion para logearse
  const loginUser = async (dni, password) => {
    const permissions_user = [];
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
      // decodificamos la data del payload
      const payloadUser = jwt_decode(data.access);
      // const { groupsId } = payloadUser;
      // obtenemos el grupo
      const { groups } = payloadUser;
      // obtenemos los modulos con permisos
      const { modulos } = groups;

      modulos.foreach((item) => {
        if (item["can_view"][0]) {
          permissions_user.push({
            title: item["name"],
            url: item["model"],
            permissions: {
              can_add: item["can_add"][0],
              can_change: item["can_change"][0],
              can_delete: item["can_delete"][0],
              can_view: item["can_view"][0],
            },
          });
        }
      });

      // seteamos los estados
      setauthTokens(data);
      setuser(payloadUser);
      setPermissions(permissions_user);

      localStorage.setItem("authTokens", JSON.stringify(data));

      navigate(`/${permissions_user[0]["url"]}`);

      // // condicional module
      // switch (groupsId) {
      //   // case rrhh
      //   case "1":
      //     navigate("/rrhh");
      //     break;
      //   case "2":
      //     navigate("/marketing");
      //     break;
      //   // other, navigate to login
      //   default:
      //     navigate("/login");
      // }
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
    permissions,
    authTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
