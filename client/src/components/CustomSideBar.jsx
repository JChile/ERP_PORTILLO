import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MdAllInbox, MdMenu } from "react-icons/md";
import { FiInbox } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth";
import MenuSimple from "./MenuSimple";

const drawerWidth = 240;
export const CustomSideBar = ({ children, permissions }) => {
  const [open, setOpen] = useState(false);
  const { currentUser, logoutUser } = useContext(AuthContext);
  const { user } = currentUser;
  const { first_name, last_name, groups } = user;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 10 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen((prev) => !prev)}
            edge="start"
            sx={{ marginRight: 5 }}
          >
            <MdMenu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sistema Portillo
          </Typography>
          <div style={{ flex: 1 }} />
          <div className="flex flex-row gap-x-3 items-center">
            <div>
              <p className="font-semi-bold text-white text-sm">
                {`${first_name ?? "Nombre"} ${last_name ?? "Apellido"}`}
              </p>
              <p className="text-xs text-[gray]">{groups.name}</p>
            </div>
            <div>
              <MenuSimple logoutUser={logoutUser} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ zIndex: 9 }}>
        <List sx={{ marginTop: 8, flex: 1 }}>
          {permissions.map((item, index) => (
            <NavLink to={item.url} key={item.title}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      mr: open ? 2 : "auto",
                    }}
                  >
                    {index % 2 === 0 ? <FiInbox /> : <MdAllInbox />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingX: 3, paddingTop: 11, paddingBottom: 5 }}
      >
        {children}
      </Box>
    </Box>
  );
};

