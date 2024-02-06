import React, { useState, useEffect, useContext } from "react";
import { getAsesorActivo } from "./getAsesor";
import { Autocomplete, TextField } from "@mui/material";
import { AuthContext } from "../../../auth";

const defaultOption = {
  value: null,
  label: "Seleccione un asesor",
  id: null,
};

export const FilterAsesor = ({
  defaultValue = null,
  onNewInput,
  label = "",
  size = "small",
}) => {
  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);
  const { authTokens } = useContext(AuthContext);

  const obtenerAsesor = async () => {
    const result = await getAsesorActivo(authTokens["access"]);
    const formatSelect = [
      defaultOption,
      ...result.map((element) => {
        return {
          value: element.id,
          label: `${
            element["first_name"].length !== 0 &&
            element["last_name"].length !== 0
              ? element["first_name"].split(" ")[0] +
                " " +
                element["last_name"].split(" ")[0]
              : element["codigoAsesor"].length !== 0
              ? element["codigoAsesor"]
              : ""
          }`,
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
    // setValue(value);
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
    obtenerAsesor();
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
