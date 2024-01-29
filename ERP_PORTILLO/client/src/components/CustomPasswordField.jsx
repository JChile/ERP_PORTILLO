import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export const CustomPasswordField = ({ handledPassword, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        name={name}
        size="small"
        onChange={handledPassword}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
