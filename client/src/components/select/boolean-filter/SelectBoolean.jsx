import React, { useState, useContext, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

export const SelectBoolean = ({
  onNewInput,
  defaultValue = "",
  size = "small",
  filterName = "",
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(defaultValue);

  const obtenerEstadoLeads = () => {
    const formatSelect = [
      {
        value: true,
        label: "Si",
      },
      {
        value: false,
        label: "No",
      },
    ];
    setOptions(formatSelect);
  };

  const handleChange = (event) => {
    const selectValue = event.target.value;
    onNewInput(selectValue, filterName);
  };

  useEffect(() => {
    obtenerEstadoLeads();
  }, []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

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
