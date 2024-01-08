import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
} from "@mui/material";
import React from "react";
import { RowItemProducto } from "../modules/productos/components";

export const CustomTableProducto = ({
  headerData,
  rowData,
  onShowDeleteDialog,
}) => {
  const productoRow = rowData.map((item) => (
    <RowItemProducto
      key={item.id}
      item={item}
      onShowDeleteDialog={onShowDeleteDialog}
    />
  ));

  const productosHeader = headerData.map((item, index) => (
    <TableCell key={index + 1} width={item.width}>
      <b>{item.name}</b>
    </TableCell>
  ));

  return (
    <Paper sx={{ borderRadius: "0px" }}>
      <TableContainer
        sx={{ minWidth: 700 }}
        arial-aria-labelledby="customized table"
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "rgba(200,200,200)",
                  backgroundColor: "#404040",
                },
              }}
            >
              {productosHeader}
            </TableRow>
          </TableHead>
          <TableBody>{productoRow}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
