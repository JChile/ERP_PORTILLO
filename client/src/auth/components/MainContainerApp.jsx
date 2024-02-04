import React, { useContext, useState } from "react";
import { AuthContext } from "../context";
import MenuSimple from "../../components/MenuSimple";
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
import { MdMenu } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { DynamicIcon } from "./DynamicIcon";

const drawerWidth = 240;

export const MainContainerApp = ({ children }) => {
  const { currentUser, logoutUser, permissions } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { user } = currentUser;
  const { first_name, last_name, groups } = user;
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

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
          <Link to={"/home"}>
            <Typography variant="h6" noWrap component="div">
              Sistema Portillo
            </Typography>
          </Link>
          <div style={{ flex: 1 }} />
          <div className="flex flex-row gap-x-3 items-center">
            <div>
              <Link to="/reportes"> 
                <p className="font-semi-bold text-xs text-[gray]">Reportes</p>
              </Link>
            </div>
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
        <List
          sx={{
            marginTop: 8,
            flex: 1,
            backgroundColor: "#9E154A",
            color: "whitesmoke",
          }}
        >
          {permissions.map((item, index) => (
            <NavLink to={item.url} key={item.title}>
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  backgroundColor:
                    selectedItem === index ? "white" : "transparent",
                }}
              >
                <ListItemButton
                  selected={selectedItem === index}
                  onClick={() => {
                    handleItemClick(index);
                  }}
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
                      color: selectedItem === index ? "#9E154A" : "inherit",
                    }}
                  >
                    <DynamicIcon iconName={item.url} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: selectedItem === index ? "#9E154A" : "inherit",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingX: 3, marginTop: 11, paddingBottom: 5 }}
        // sx={{ flexGrow: 1, }}
      >
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
