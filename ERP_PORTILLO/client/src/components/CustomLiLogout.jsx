import React, { useContext } from "react";
import { AuthContext } from "../auth/context";
import { DynamicIcon } from "./DynamicIcon";

export const CustomLiLogout = ({ open }) => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <li
      onClick={logoutUser}
      className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
    >
      <DynamicIcon name={"MdLogout"} />
      <span className={`${!open && "hidden"} origin-left duration-200`}>
        Logout
      </span>
    </li>
  );
};
