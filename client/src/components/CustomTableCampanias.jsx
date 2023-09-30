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
import { RowItemCampania } from "../modules/campania/components";

export const CustomTableCampanias = ({
  headerData,
  rowData,
  onShowDeleteDialog,
}) => {
  const campaniasRow = rowData.map((item) => (
    <RowItemCampania
      key={item.id}
      item={item}
      onShowDeleteDialog={onShowDeleteDialog}
    />
  ));

  const campaniasHeader = headerData.map((item, index) => (
    <TableCell key={index + 1} width={item.width}>
      <b>{item.name}</b>
    </TableCell>
  ));

  return (
    <Paper>
      <TableContainer
        sx={{ minWidth: 700 }}
        arial-aria-labelledby="customized table"
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "rgba(96,96,96)",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              {campaniasHeader}
            </TableRow>
          </TableHead>
          <TableBody>{campaniasRow}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
