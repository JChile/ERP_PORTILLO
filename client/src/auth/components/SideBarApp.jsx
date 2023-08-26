import React, { useContext } from "react";
import { CustomSideBar } from "../../components";
import { AuthContext } from "../context";

export const SideBarApp = ({ children }) => {
  //   const Menus = [
  //     {
  //       title: "Campañas",
  //       src: "MdCampaign",
  //       url: `campania`,
  //     },
  //   ];

  const { permissions } = useContext(AuthContext);

  return <CustomSideBar children={children} menus={permissions} />;
};
