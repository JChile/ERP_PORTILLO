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

export const CustomSideBar = ({ children, menus }) => {
  const [open, setOpen] = useState(false);
  const { currentUser, logoutUser } = useContext(AuthContext);
  const { user } = currentUser;
  const { first_name, last_name, groups } = user;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
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
      <Drawer variant="permanent" open={open}>
        <List sx={{ marginTop: 8, flex: 1 }}>
          {menus.map((item, index) => (
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
      <Box component="main" sx={{ flexGrow: 1, paddingX: 3, paddingTop: 11 }}>
        {children}
      </Box>
    </Box>
  );
};

/** Style component */
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "black",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#9e154a",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    backgroundColor: "#9e154a",
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

{
  /*


<div
          className={`${
            open ? "max-w-52 w-fit" : "w-32 "
          } bg-dark-purple py-5 relative duration-300 flex flex-col items-center`}
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
              className={`cursor-pointer duration-500 w-16 ${
                open && "rotate-[360deg]"
              }`}
            />
          </div>
          <ul className="py-6 mx-2">
            {menus.map((item, index) => (
              <CustomNavLinkSideBar key={index} item={item} open={open} />
            ))}
          </ul>
        </div>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    */
}
