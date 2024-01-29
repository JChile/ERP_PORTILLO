import React, { useEffect, useState } from "react";
import { getSubcategorias } from "./getSubcategorias";
import { Autocomplete, TextField } from "@mui/material";

const defaultOption = {
  value: 0,
  label: "Seleccione una opción",
  id: 0,
};

export const FilterSubcategoria = ({ onNewInput, defaultValue = null }) => {
  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);

  const obtenerSubcategorias = async () => {
    const result = await getSubcategorias();
    const formatSelect = [
      defaultOption,
      ...result.map((element) => {
        return {
          value: element.id,
          label: element.nombre,
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
    obtenerSubcategorias();
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
