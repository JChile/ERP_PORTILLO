import { AppBar, Container, Paper, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../auth";
import MenuSimple from "./MenuSimple";

export const CustomTopBar = () => {
  const { currentUser, logoutUser } = useContext(AuthContext);
  const { user } = currentUser;
  const { first_name, last_name, groups } = user;

  // bg-[#282828]

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "black", paddingY: "0.68rem" }}
    >
      <Container>
        <Toolbar>
          <Typography variant="h6">Sistema Portillo</Typography>
          <div style={{ flex: 1 }} />
          <div className="flex flex-row gap-x-3 items-center">
            <div>
              <p className="text-base font-semi-bold text-white">
                {`${first_name ?? "Nombre"} ${last_name ?? "Apellido"}`}
              </p>
              <p className="text-xs text-[gray]">{groups.name}</p>
            </div>
            <div>
              <MenuSimple logoutUser={logoutUser} />
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
