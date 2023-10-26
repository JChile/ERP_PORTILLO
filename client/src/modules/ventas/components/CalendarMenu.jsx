import * as React from "react";
import { AiOutlineDown } from "react-icons/ai";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";


export const CalendarMenu = ({ calendarStates, text, setView }) => {
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          width: "110px",
        }}
      >
        <Tooltip title="Menu">
          <button
            onClick={handleClick}
            className="border rounded flex justify-between items-center py-2 px-4 text-gray-950 font-bold gap-x-1 hover:bg-slate-100 hover:shadow-x w-full"
          >
            {text}
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
        <MenuItem onClick={() => setView(calendarStates.month)}>
          <p className="mr-8">Mes</p>
          <span className="ml-auto">M</span>
        </MenuItem>
        <MenuItem onClick={() => setView(calendarStates.week)}>
          <p className="mr-8">Semana</p>
          <span className="ml-auto">D</span>
        </MenuItem>
      </Menu>
    </>
  );
};
