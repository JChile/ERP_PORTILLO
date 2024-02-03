import React, { useState } from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const CustomDatePicker = ({
  onNewFecha,
  disabled = false,
  label = "",
  disabledPast = false,
  defaultValue = "",
}) => {
  const [value, setValue] = useState(dayjs(defaultValue));

  const formatFecha = (newValue) => {
    // Formatear la fecha a formato PostgreSQL (ISO 8601)
    const formattedDate = newValue.format("YYYY-MM-DD");
    onNewFecha(formattedDate);
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
  };

  return (
    <DatePicker
      label={label}
      value={value}
      disablePast={disabledPast}
      slotProps={{ textField: { size: "small" } }}
      format="DD/MM/YYYY"
      sx={{ maxWidth: 180 }}
      onChange={formatFecha}
      disabled={disabled}
      TextField={(params) => (
        <TextField {...params} onKeyDown={handleKeyDown} />
      )}
    />
  );
};
