import { Checkbox, FormControlLabel, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";

export const RowItemPermission = ({
  item,
  modifyPermission,
  modifyAllPermissions,
}) => {
  const [checkedPermission, setCheckedPermission] = useState({
    checkedAll: item["can_view"][0] ? true : false,
    can_view: item["can_view"][0],
    can_add: item["can_add"][0],
    can_change: item["can_change"][0],
    can_delete: item["can_delete"][0],
  });

  const { checkedAll, can_view, can_add, can_change, can_delete } =
    checkedPermission;

  const handledCheckedPermission = ({ target }) => {
    const { name, checked } = target;

    if (name === "checkedAll") {
      if (checked) {
        setCheckedPermission({
          checkedAll: true,
          can_view: true,
          can_add: true,
          can_change: true,
          can_delete: true,
        });
      } else {
        setCheckedPermission({
          checkedAll: false,
          can_view: false,
          can_add: false,
          can_change: false,
          can_delete: false,
        });
      }
      modifyAllPermissions(item.id, checked);
    } else if (name === "can_view") {
      if (checked) {
        setCheckedPermission({
          ...checkedPermission,
          checkedAll: true,
          [name]: checked,
        });
        modifyPermission(item.id, name, checked);
      } else {
        setCheckedPermission({
          checkedAll: false,
          can_view: false,
          can_add: false,
          can_change: false,
          can_delete: false,
        });
        modifyAllPermissions(item.id, checked);
      }
    } else {
      if (can_view) {
        setCheckedPermission({ ...checkedPermission, [name]: checked });
        modifyPermission(item.id, name, checked);
      }
    }
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedAll}
              name="checkedAll"
              onChange={handledCheckedPermission}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={item.nombre}
        ></FormControlLabel>
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={can_view}
          name="can_view"
          onChange={handledCheckedPermission}
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={can_add}
          name="can_add"
          onChange={handledCheckedPermission}
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={can_change}
          name="can_change"
          onChange={handledCheckedPermission}
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={can_delete}
          name="can_delete"
          onChange={handledCheckedPermission}
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
    </TableRow>
  );
};
