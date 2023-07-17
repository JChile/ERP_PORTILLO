import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = ({ name, handledForm, value }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={handledForm}
      size="small"
      variant="outlined"
    />
  );
};

export default CustomTextField;
