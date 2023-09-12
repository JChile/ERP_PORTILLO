import React, { useState, useEffect } from "react";
import { getEstadoLead } from "./getEstadoLead";
import { Autocomplete, TextField } from "@mui/material";

const defaultOption = {
  value: 0,
  label: "Selecione un estado",
  id: 0,
};

export const FilterEstadoLead = ({ defaultValue = null, onNewInput }) => {
  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);

  const obtenerEstadosLead = async () => {
    const result = await getEstadoLead();
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
    obtenerEstadosLead();
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
      renderInput={(params) => <TextField {...params} size="smalll" />}
    />
  );
};
