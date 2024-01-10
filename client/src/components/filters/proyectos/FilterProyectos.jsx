<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { getProyectos } from "../../../modules/proyectos/helpers";
=======
import React, { useState, useEffect, useContext } from "react";
import { getProyectos } from "./getProyectos";
import { Autocomplete, TextField } from "@mui/material";
import { AuthContext } from "../../../auth";
>>>>>>> c3a6f69a7b9446cd46b6cf97f2b27ff1928b4edd

const defaultOption = {
  value: 0,
  label: "Seleccione un proyecto",
  id: 0,
};

<<<<<<< HEAD
/**
 * 
 * @param {*} param0
 * @param {token} String Token del usuario registrado. 
 * @returns 
 */
export const FilterProyectos = ({ defaultValue = null, onNewInput, label = "", token }) => {
=======
export const FilterProyectos = ({
  defaultValue = null,
  onNewInput,
  label = "",
}) => {
>>>>>>> c3a6f69a7b9446cd46b6cf97f2b27ff1928b4edd
  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);
  const { authTokens } = useContext(AuthContext);

  const obtenerProyectos = async () => {
<<<<<<< HEAD
    const result = await getProyectos(token);
=======
    const result = await getProyectos(authTokens["access"]);
>>>>>>> c3a6f69a7b9446cd46b6cf97f2b27ff1928b4edd
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
    obtenerProyectos();
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
