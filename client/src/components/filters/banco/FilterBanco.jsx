import React, { useState, useEffect, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { AuthContext } from "../../../auth";
import { getBanks } from "./getBanco";

const defaultOption = {
  value: null,
  label: "Seleccione un banco",
  id: null,
};

export const FilterBanco = ({
  defaultValue = null,
  onNewInput,
  label = "",
  size = "small",
}) => {

  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);
  const { authTokens } = useContext(AuthContext);

  const obtenerBanco = async () => {
    const result = await getBanks(authTokens["access"]);
    const formatSelect = [
      defaultOption,
      ...result.map((element) => {
        return {
          value: element.id,
          label: element.codigo,
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
    //setValue(value);
  };

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

  useEffect(() => {
    obtenerBanco();
  }, []);

  return (
    <Autocomplete
      options={options}
      value={value}
      disableClearable
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField {...params} size={size} label={label} />
      )}
    />
  );
};
