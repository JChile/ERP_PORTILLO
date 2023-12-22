import { useEffect, useState } from "react";
import { getLeads } from "../../../modules/lead/helpers/getLeads";
import { Autocomplete, TextField } from "@mui/material";

const defaultOption = { value: 0, label: "Seleccione lead", id: null };

export const FilterLeads = ({ defaultValue = null, onNewInput, label = "" }) => {
  const [options, setOptions] = useState([defaultOption]);
  const [value, setValue] = useState(defaultOption);

  const obtenerLeads = async () => {
    const result = await getLeads();
    const formatSelect = [
      defaultOption,
      ...result.map((item) => {
        return {
          value: item.id,
          label: item.nombre,
          id: item.id,
        };
      }),
    ];
    setOptions(formatSelect);
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
    obtenerLeads();
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
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
