import { Paper } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../auth";
import MenuSimple from "./MenuSimple";

export const CustomTopBar = () => {
  const { currentUser, logoutUser } = useContext(AuthContext);
  const { user } = currentUser;
  const { first_name, last_name, groups } = user;

  return (
    <Paper elevation={1} square>
      <div className="py-6 px-8 flex flex-row items-center justify-between bg-[#282828]">
        <h1 className="text-lg font-bold text-white">
          Sistema Inmobiliaria Portillo
        </h1>
        <div className="flex flex-row gap-x-3 items-center">
          <div>
            <p className="text-base font-semi-bold text-white">
              {`${first_name ?? "Nombre"} ${last_name ?? "Apellido"}`}
            </p>
            <p className="text-xs text-[gray]">{groups.name}</p>
          </div>
          <div>
            <MenuSimple logoutUser={logoutUser}/>
          </div>
        </div>
      </div>
    </Paper>
  );
};
