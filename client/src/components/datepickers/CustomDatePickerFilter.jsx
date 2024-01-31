import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const CustomDatePickerFilter = ({
  onNewFecha,
  disabled = false,
  label = "",
  filterName = "",
  defaultValue = "",
}) => {
  const [value, setValue] = useState(dayjs(defaultValue));

  const formatFecha = (newValue) => {
    // setValue(newValue);
    // Formatear la fecha a formato PostgreSQL (ISO 8601)
    const formattedDate = newValue.format("YYYY-MM-DD");
    onNewFecha(formattedDate, filterName);
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setValue(dayjs(defaultValue));
  }, [defaultValue]);

  return (
    <DatePicker
      label={label}
      value={value}
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
