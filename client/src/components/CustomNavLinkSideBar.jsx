import React from "react";
import { NavLink } from "react-router-dom";
import { DynamicIcon } from "./DynamicIcon";
import { FiSettings } from "react-icons/fi";

export const CustomNavLinkSideBar = ({ item, open }) => {
  const { url, title, gap = false } = item;
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        isActive
          ? `flex py-2 px-3 bg-light-white rounded cursor-pointer hover:bg-dark-purple-white my-1 text-gray-300 text-sm items-center gap-x-4 
          ${gap ? "mt-9" : ""}`
          : `flex py-2 px-3  cursor-pointer rounded hover:bg-light-white text-gray-300 text-sm my-1 items-center gap-x-4 
          ${gap ? "mt-9" : ""}`
      }
    >
      <div className={`${!open && "mx-auto"} `}>
        <FiSettings />
      </div>
      <span className={`${!open && "hidden"} origin-left duration-200`}>
        {title}
      </span>
    </NavLink>
  );
};
