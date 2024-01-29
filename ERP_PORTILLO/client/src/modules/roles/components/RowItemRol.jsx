import React from "react";
import "./rolItem.css";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { CustomMoreVerticalActions } from "../../../components";

export const RowItemRol = ({ item }) => {
  const navigate = useNavigate();

  const onEditItemSelected = () => {
    navigate(`/rol/update/${item.id}`);
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell>
        <CustomMoreVerticalActions
          onEdit={onEditItemSelected}
          activeOnDelete={false}
        />
      </TableCell>
      <TableCell>
        <Link
          className="text-blue-500"
          to={`/rol/detail/${item.id}`}
        >{`${item.name}`}</Link>
      </TableCell>
    </TableRow>
  );
};
