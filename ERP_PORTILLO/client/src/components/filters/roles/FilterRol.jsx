import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRoles } from "./getRoles";

const defaultOption = {
  value: 0,
  label: "Selecciona un opcion",
  id: 0,
};
export const FilterRol = ({ onNewInput, defaultValue = null }) => {
  const [options, setOptions] = useState([defaultOption]);

  const [value, setValue] = useState(defaultOption);

  const obtenerDataRoles = async () => {
    const resultPeticion = await getRoles();
    const formatSelect = [
      defaultOption,
      ...resultPeticion.map((element) => {
        return {
          value: element.id,
          label: element.name,
          id: element.id,
        };
      }),
    ];
    setOptions(formatSelect);
    // Verificar si defaultValue coincide con alguna opción y establecer el valor inicial
    const defaultValueOption = formatSelect.find(
      (option) => option.id === defaultValue
    );
    if (defaultValueOption) {
      setValue(defaultValueOption);
    }
  };

  // useeffect cuando se carga el componente
  useEffect(() => {
    const controller = new AbortController();
    obtenerDataRoles();
    return () => controller.abort();
  }, []);

  // use effect cuando hay cambios en el valor por defecto
  useEffect(() => {
    // verficar si defualtvalue coincide
    const defaultValueOption = options.find(
      (option) => option.id === defaultValue
    );
    if (defaultValueOption) {
      setValue(defaultValueOption);
    }
  }, [defaultValue]);

  const handledChange = (event, value) => {
    onNewInput(value);
    setValue(value);
  };

  return (
    <Autocomplete
      options={options}
      value={value}
      disableClearable
      getOptionLabel={(option) => option.label}
      onChange={handledChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} size="small" />}
    />
  );
};
