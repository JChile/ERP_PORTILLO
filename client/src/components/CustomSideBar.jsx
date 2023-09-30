import React, { useState } from "react";
import { CustomNavLinkSideBar } from "./CustomNavLinkSideBar";
import ArrowLeft from "../assets/control.png";
import LogoPortillo from "../assets/portillo-logo-port.png";

export const CustomSideBar = ({ children, menus }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex grow">
      <div
        className={`${
          open ? "w-[14rem] min-w-[14rem] max-w-[14rem]" : "w-[8rem] min-w-[8rem] max-w-[8rem]"
        } bg-dark-purple p-5  pt-8 relative duration-300`}
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
        </div>
        <ul className="pt-6">
          {/* MENUS DE NAVEGACION */}
          {menus.map((item, index) => (
            <CustomNavLinkSideBar key={index} item={item} open={open} />
          ))}
        </ul>
      </div>
      {/**  Lado derecho del a interfaz, permite cargar el contenido */}
      <div className="p-9 relative grow overflow-y-auto">{children}</div>
    </div>
  );
};
