import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const defaultOptions = [
  {
    value: 1,
    label: "Activo",
    id: "A",
  },
  {
    value: 2,
    label: "Inactivo",
    id: "I",
  },
];

export const FilterEstadoRegistro = ({
  onNewInput = () => {},
  defaultValue = "A",
}) => {
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(defaultOptions[0]);

  const asignarValorDefecto = () => {
    setValue(defaultValue === "A" ? defaultOptions[0] : defaultOptions[1]);
  };

  const handleChange = (event, value) => {
    onNewInput(value);
    // setValue(value);
  };

  useEffect(() => {
    asignarValorDefecto();
  }, [defaultValue]);

  return (
    <Autocomplete
      options={options}
      value={value}
      disableClearable
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} size="small" />}
    />
  );
};
