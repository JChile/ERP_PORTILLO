import React, { useState, useContext, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { AuthContext } from "../../../auth";
import { getCategoriaCampania } from "./getCategoriaCampania";

export const SelectCategoriaCampania = ({
  onNewInput,
  size = "small",
  defaultValue = "",
  name = "categoriaCampania",
}) => {
  const { authTokens } = useContext(AuthContext);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(defaultValue);

  const obtenerCategoriaCampanias = async () => {
    const result = await getCategoriaCampania({
      authToken: authTokens["access"],
    });
    const formatSelect = result.map((element) => {
      return {
        value: element.id,
        label: element.nombre,
      };
    });
    setOptions(formatSelect);
  };

  const handleChange = (event) => {
    const selectValue = event.target.value;
    onNewInput(selectValue, name);
  };

  useEffect(() => {
    obtenerCategoriaCampanias();
  }, []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size={size}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((element, index) => (
          <MenuItem key={element.value} value={element.label}>
            {element.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
