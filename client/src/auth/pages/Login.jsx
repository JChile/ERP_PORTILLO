import React, { useContext } from "react";
import { AuthContext } from "../context";

export const Login = () => {
  // context
  const { loginUser } = useContext(AuthContext);

  return <div>Login</div>;
};
