import React, { useContext } from "react";
import { CustomSideBar } from "../../components";
import { AuthContext } from "../context";
import { CustomTopBar } from "../../components/CustomTopBar";

export const MainContainerApp = ({ children }) => {
  const { permissions } = useContext(AuthContext);

  return (
    <div className="flex flex-col h-full">
      <CustomTopBar />
      <CustomSideBar children={children} menus={permissions} />
    </div>
  );
};
