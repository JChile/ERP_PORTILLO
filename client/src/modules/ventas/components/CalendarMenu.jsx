import * as React from "react";
import { AiOutlineDown } from "react-icons/ai";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FiLogOut, FiUser } from "react-icons/fi";
import { HiArrowDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const CalendarMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Menu">
          <button
            onClick={handleClick}
            className="border rounded flex items-center py-2 px-4 text-gray-950 font-bold gap-x-1 hover:bg-slate-100 hover:shadow-x"
          >
            Mes
            <AiOutlineDown className="h-4 w-4" />
          </button>
        </Tooltip>
      </Box>
      <Menu
        className="mt-2"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => {}}>
          <p className="mr-8">Mes</p>
          <span className="ml-auto">M</span>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <p className="mr-8">Semana</p>
          <span className="ml-auto">D</span>
        </MenuItem>
      </Menu>
    </>
  );
};
