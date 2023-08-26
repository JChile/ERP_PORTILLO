import React from "react";
import { NavLink } from "react-router-dom";
import { DynamicIcon } from "./DynamicIcon";

export const CustomNavLinkSideBar = ({ item, open }) => {
  const { url, title, gap = false } = item;
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        isActive
          ? `bg-light-white flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          ${gap ? "mt-9" : "mt-2"}`
          : `flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          ${gap ? "mt-9" : "mt-2"}`
      }
    >
      {/* <DynamicIcon name={src} /> */}
      <span className={`${!open && "hidden"} origin-left duration-200`}>
        {title}
      </span>
    </NavLink>
  );
};
