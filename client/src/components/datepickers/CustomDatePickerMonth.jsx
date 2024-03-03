import React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const CustomDatePickerMonth = ({
  onNewFecha,
  disabled = false,
  label = "",
  value
}) => {
  const formatFecha = (newValue) => {
    const newDate = new Date(newValue)
    onNewFecha(newDate);
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
  };

  return (
    <DatePicker
      label={label}
      value={dayjs(value)}
      views={['month']}
      slotProps={{ textField: { size: "small" } }}
      format="MM/YYYY"
      sx={{ maxWidth: 180 }}
      onChange={formatFecha}
      disabled={disabled}
      TextField={(params) => (
        <TextField {...params} onKeyDown={handleKeyDown} />
      )}
    />
  );
};
