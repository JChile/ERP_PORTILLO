import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { getProyectos } from "../../../modules/proyectos/helpers";

const defaultOption = {
  value: 0,
  label: "Seleccione un proyecto",
  id: 0,
};

/**
 * 
 * @param {*} param0
 * @param {token} String Token del usuario registrado. 
 * @returns 
 */
export const FilterProyectos = ({ defaultValue = null, onNewInput, label = "", token }) => {
  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);

  const obtenerProyectos = async () => {
    const result = await getProyectos(token);
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
    obtenerProyectos();
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
      renderInput={(params) => <TextField {...params} size="small" label={label}/>}
    />
  );
};
