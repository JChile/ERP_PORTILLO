import React from "react";
import { CustomSideBar } from "../../../components";

export const NavBarMarketing = ({ children }) => {
  const location = "/marketing";
  const Menus = [
    {
      title: "Campañas",
      src: "MdCampaign",
      url: `${location}/campaña`,
    },
    { title: "Leads", src: "MdOutlineStars", url: `${location}/lead` },
    { title: "Asesores", src: "MdPointOfSale", url: `${location}/asesor` },
    { title: "Reportes", src: "MdLeaderboard", url: `${location}/reporte` },
    { title: "Cuenta", src: "MdManageAccounts", gap: true, url: "/perfil" },
  ];

  return (
    <CustomSideBar children={children} menus={Menus} title={"Marketing"} />
  );
};
