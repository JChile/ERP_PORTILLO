import React, { useEffect, useState } from "react";
import { getEstadoEvento } from "./getEstadoEvento";
import { Autocomplete, TextField } from "@mui/material";

const defaultOption = {
  value: 0,
  label: "Selecione un estado",
  id: null,
};

const FilterEstadoEvento = ({
  defaultValue = null,
  onNewInput,
  size = "medium",
  label = "",
  disabled = false,
}) => {
  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);

  const obtenerEstadoEventos = async () => {
    const result = await getEstadoEvento();
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
    obtenerEstadoEventos();
  }, [defaultValue]);

  return (
    <Autocomplete
      disabled={disabled}
      options={options}
      value={value}
      disableClearable
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id == value.id}
      renderInput={(params) => (
        <TextField label={label} {...params} size={size} />
      )}
    />
  );
};

export default FilterEstadoEvento;
