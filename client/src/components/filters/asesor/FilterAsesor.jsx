import React, { useState, useEffect } from "react";
import { getAsesorActivo } from "./getAsesor";
import { Autocomplete, TextField } from "@mui/material";

const defaultOption = {
  value: 0,
  label: "Seleccione un asesor",
  id: null,
};

export const FilterAsesor = ({ defaultValue = null, onNewInput }) => {
  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);

  const obtenerAsesor = async () => {
    const result = await getAsesorActivo();
    const formatSelect = [
      defaultOption,
      ...result.map((element) => {
        return {
          value: element.id,
          label: element.user.username,
          id: element.id,
        };
      }),
    ];
    setOptions(formatSelect);
    // verficar si defualtvalue coincide
    const defaultValueOption = formatSelect.find(
      (option) => option.id === defaultValue
    );
    if (defaultValueOption) {
      setValue(defaultValueOption);
    }
  };

  const handleChange = (event, value) => {
    onNewInput(value);
    setValue(value);
  };

  useEffect(() => {
    const controller = new AbortController();
    obtenerAsesor();
    return () => controller.abort();
  }, [defaultValue]);

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
