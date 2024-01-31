import React, { useState, useContext, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { AuthContext } from "../../../auth";
import { getAsesor } from "./getAsesor";

const SelectAsesor = ({ onNewInput, size = "small", defaultValue = "" }) => {
  const { authTokens } = useContext(AuthContext);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(defaultValue);

  const obtenerAsesores = async () => {
    const result = await getAsesor(authTokens["access"]);
    const formatSelect = result.map((element) => {
      const asesorName = `${element.first_name} ${element.last_name}`;
      return { value: asesorName, label: asesorName };
    });
    setOptions(formatSelect);
  };

  const handleChange = (event) => {
    const selectValue = event.target.value;
    const name = "asesor";
    onNewInput(selectValue, name);
  };

  useEffect(() => {
    obtenerAsesores();
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
        style={{
          maxWidth: "120px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
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

export default SelectAsesor;
