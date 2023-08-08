import React from "react";
import { CustomSideBar } from "../../../components/sidebar/CustomSideBar";

export const NavBarRRHH = ({ children }) => {
  const location = "/rrhh";
  const Menus = [
    {
      title: "Usuarios",
      src: "MdSupervisedUserCircle",
      url: `${location}/usuario`,
    },
    { title: "Roles", src: "MdOutlineControlCamera", url: `${location}/roles` },
    { title: "Cuenta", src: "MdManageAccounts", gap: true, url: "/perfil" },
  ];

  return (
    <CustomSideBar
      children={children}
      menus={Menus}
      title={"Recursos Humanos"}
    />
  );
};
