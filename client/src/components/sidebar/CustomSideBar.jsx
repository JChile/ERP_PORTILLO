import React, { useState } from "react";
import { CustomNavLinkSideBar } from "../CustomNavLinkSideBar";
import { CustomLiLogout } from "../CustomLiLogout";
import ArrowLeft from "../../assets/control.png";
import LogoPortillo from "../../assets/portillo-logo-port.png";

export const CustomSideBar = ({ children, menus, title }) => {
  const [open, setOpen] = useState(true);

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
            {title}
          </h1>
        </div>
        <ul className="pt-6">
          {/* MENUS DE NAVEGACION */}
          {menus.map((item, index) => (
            <CustomNavLinkSideBar key={index} item={item} open={open} />
          ))}
          {/* LOGOUT OPTION */}
          <CustomLiLogout open={open} />
        </ul>
      </div>
      <div className="relative h-screen flex-1 p-7">{children}</div>
    </div>
  );
};
