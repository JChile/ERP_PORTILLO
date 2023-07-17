import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRoles } from "./getRoles";

export const FilterRol = ({ onNewInput, defaultValue = 0 }) => {
  const [result, setResult] = useState([
    {
      value: 0,
      label: "Selecciona un rol",
      id: 0,
    },
  ]);

  const obtenerDataRoles = async () => {
    const resultPeticion = await getRoles();
    const formatSelect = [
      ...result,
      ...resultPeticion.map((element) => {
        return {
          value: element.id,
          label: element.name,
          id: element.id,
        };
      }),
    ];
    setResult(formatSelect);
  };

  useEffect(() => {
    obtenerDataRoles();
  }, []);

  const handledChange = (event, value) => {
    onNewInput(value);
  };

  return (
    <Autocomplete
      options={result}
      value={result[result.findIndex((item) => item.id === defaultValue)]}
      disableClearable
      getOptionLabel={(option) => option.label}
      onChange={handledChange}
      renderInput={(params) => <TextField {...params} size="small" />}
    />
  );
};
