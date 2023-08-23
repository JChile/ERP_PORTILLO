import { Checkbox, FormControlLabel, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";

export const PermissionItem = ({
  item,
  modifyPermission,
  modifyAllPermissions,
}) => {
  const [checkedPermission, setCheckedPermission] = useState({
    checkedAll: true,
    canView: item.canView,
    canCreate: item.canCreate,
    canEdit: item.canEdit,
    canDelete: item.canDelete,
  });

  const { checkedAll, canView, canCreate, canEdit, canDelete } =
    checkedPermission;

  const handledCheckedPermission = ({ target }) => {
    const { name, checked } = target;

    if (name === "checkedAll") {
      if (checked) {
        setCheckedPermission({
          checkedAll: true,
          canView: true,
          canCreate: true,
          canEdit: true,
          canDelete: true,
        });
      } else {
        setCheckedPermission({
          checkedAll: false,
          canView: false,
          canCreate: false,
          canEdit: false,
          canDelete: false,
        });
      }
      modifyAllPermissions(item.id, checked);
    } else if (name === "canView") {
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
          canView: false,
          canCreate: false,
          canEdit: false,
          canDelete: false,
        });
        modifyAllPermissions(item.id, checked);
      }
    } else {
      if (canView) {
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
          checked={canView}
          name="canView"
          onChange={handledCheckedPermission}
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={canCreate}
          name="canCreate"
          onChange={handledCheckedPermission}
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={canEdit}
          name="canEdit"
          onChange={handledCheckedPermission}
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={canDelete}
          name="canDelete"
          onChange={handledCheckedPermission}
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
    </TableRow>
  );
};
