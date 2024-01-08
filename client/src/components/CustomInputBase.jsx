import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";

export const CustomInputBase = ({ onSearch, placeholder = "" }) => {
  const [search, setSearch] = useState("");

  return (
    <form
      className="flex gap-x-2 mb-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(search);
      }}
    >
      <TextField
        placeholder={placeholder}
        size="small"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        sx={{
          borderRadius: "0px",
        }}
        InputProps={{
          endAdornment: search ? (
            <MdClose
              onClick={() => setSearch("")}
              color="black"
              cursor="pointer"
              className="hover:bg-gray-300 rounded-full w-5"
            />
          ) : (
            <MdSearch color="black" className="w-5" />
          ),
        }}
      />

      <Button
        variant="contained"
        sx={{ textTransform: "capitalize", borderRadius: "0px" }}
        onClick={(event) => {
          event.preventDefault();
          onSearch(search);
        }}
      >
        Buscar
      </Button>
    </form>
  );
};
