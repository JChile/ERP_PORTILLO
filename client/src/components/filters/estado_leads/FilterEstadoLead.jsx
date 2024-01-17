import React, { useState, useEffect, useContext } from "react";
import { getEstadoLead } from "./getEstadoLead";
import { Autocomplete, TextField } from "@mui/material";
import { AuthContext } from "../../../auth";

const defaultOption = {
  value: 0,
  label: "Selecione un estado",
  id: null,
};

export const FilterEstadoLead = ({
  defaultValue = null,
  onNewInput,
  label = "",
}) => {
  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);
  const { authTokens } = useContext(AuthContext);

  const obtenerEstadosLead = async () => {
    const result = await getEstadoLead(authTokens["access"]);
    const formatSelect = [
      defaultOption,
      ...result.map((element) => {
        return {
          value: element.nombre,
          label: element.descripcion,
          id: element.nombre,
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
      renderInput={(params) => (
        <TextField {...params} size="small" label={label} />
      )}
    />
  );
};
