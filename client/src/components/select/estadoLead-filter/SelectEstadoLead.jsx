import React, { useState, useContext, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { AuthContext } from "../../../auth";
import { getEstadoLead } from "./getEstadoLead";

export const SelectEstadoLead = ({ onNewInput, size = "small" }) => {
  const { authTokens } = useContext(AuthContext);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");

  const obtenerEstadoLeads = async () => {
    const result = await getEstadoLead(authTokens["access"]);
    console.log(result);
    const formatSelect = result.map((element) => {
      return {
        value: element.nombre,
        label: element.nombre,
      };
    });
    setOptions(formatSelect);
  };

  const handleChange = (event) => {
    const selectValue = event.target.value;
    const name = "estadoLead";
    onNewInput(selectValue, name);
    setValue(selectValue + "");
  };

  useEffect(() => {
    obtenerEstadoLeads();
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size={size}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((element, index) => (
          <MenuItem key={element.value} value={element.label}>
            {element.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
