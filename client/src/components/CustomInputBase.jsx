import {
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import React, { useState } from "react";

export const CustomInputBase = ({ filters, defaultFilter, onSearch, placeholder }) => {
  const [search, setSearch] = useState({ text: "", filter: defaultFilter });

  const { text, filter } = search;

  const hanldeChangeForm = (event) => {
    const { name, value } = event.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const filterList = filters.map((filter, index) => (
    <MenuItem
      sx={{
        fontSize: "0.9rem",
      }}
      key={index}
      value={filter}
    >
      {filter}
    </MenuItem>
  ));

  return (
    <Paper
      sx={{
        p: "2px 8px",
        display: "flex",
        alignItems: "center",
        minWidth: 540,
        height: 50,
      }}
      elevation={0}
      variant="outlined"

    >
      <Select
        value={filter}
        label="Filtro"
        onChange={hanldeChangeForm}
        name="filter"
        height="1"
        sx={{
            fontSize: "0.9rem",
            height: "2rem",
            width: "7.5rem"
        }}
      >
        {filterList}
      </Select>

      <InputBase
        value={text}
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
        onChange={hanldeChangeForm}
        name="text"
      />

      <Button onClick={() => onSearch(filter, text)} variant="contained">Buscar</Button>
    </Paper>
  );
};
