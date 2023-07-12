import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DynamicIcon from "../../../components/DynamicIcon";
import LogoPortillo from "../../../assets/portillo-logo-port.png";
import ArrowLeft from "../../../assets/control.png";

export const NavBarRRHH = ({ children }) => {
  const location = "/rrhh";
  const [open, setOpen] = useState(true);
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
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={ArrowLeft}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
       border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-10 items-center">
          <img
            src={LogoPortillo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-x duration-200 ${
              !open && "scale-0"
            }`}
          >
            Recursos Humanos
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <NavLink
              to={Menu.url}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? `bg-light-white flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          ${Menu.gap ? "mt-9" : "mt-2"}`
                  : `flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          ${Menu.gap ? "mt-9" : "mt-2"}`
              }
            >
              <DynamicIcon name={Menu.src} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="relative h-screen flex-1 p-7">{children}</div>
    </div>
  );
};
