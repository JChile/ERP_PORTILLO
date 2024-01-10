import React, { useState, useEffect, useContext } from "react";
import { getProyectos } from "./getProyectos";
import { Autocomplete, TextField } from "@mui/material";
import { AuthContext } from "../../../auth";
const defaultOption = {
  value: 0,
  label: "Seleccione un proyecto",
  id: 0,
};

export const FilterProyectos = ({
  defaultValue = null,
  onNewInput,
  label = "",
}) => {
  const { authTokens } = useContext(AuthContext);
  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);

  const obtenerProyectos = async () => {
    const result = await getProyectos({ authToken: authTokens["access"] });
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
      renderInput={(params) => (
        <TextField {...params} size="small" label={label} />
      )}
    />
  );
};
