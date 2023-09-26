import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const defaultOptions = [
  {
    value: 0,
    label: "Seleccione un estado",
    id: 0,
  },
  {
    value: 1,
    label: "Activo",
    id: 1,
  },
  {
    value: 2,
    label: "Inactivo",
    id: 2,
  },
];

export const FilterEstadoRegistro = ({ onNewInput, defaultValue = null }) => {
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(defaultOptions[0]);

  const handleChange = (event, value) => {
    onNewInput(value);
    setValue(value);
  };

  return (
    <Autocomplete
      options={options}
      value={value}
      disableClearable
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id == value.id}
      renderInput={(params) => <TextField {...params} size="small" />}
    />
  );
};
