import React, { useContext } from "react";
import { CustomSideBar } from "../../components";
import { AuthContext } from "../context";

export const MainContainerApp = ({ children }) => {
  const { permissions } = useContext(AuthContext);

  return <CustomSideBar children={children} menus={permissions} />;
};
