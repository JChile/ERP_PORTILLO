import { TextField } from "@mui/material";
import React from "react";

export const CustomTextField = ({
  name,
  handledForm,
  value,
  disabled = false,
}) => {
  return (
    <TextField
      name={name}
      disabled={disabled}
      value={value}
      onChange={handledForm}
      size="small"
      variant="outlined"
    />
  );
};
