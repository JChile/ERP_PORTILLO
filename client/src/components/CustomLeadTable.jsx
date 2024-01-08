import React, { useEffect, useState } from "react";
import {
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
} from "@mui/material";
import { RowItemLead } from "../modules/lead/components";
import { CustomTablePagination } from "./CustomTablePagination";

/**
 *
 * @param {list} headerData
 * @param {list} rowData
 * @returns
 */
export const CustomTable = ({ headerData, rowData, onShowDeleteDialog }) => {
  const headers = headerData.map((header, index) => (
    <TableCell key={index} align="left" width={header.width}>
      <b>{header.name}</b>
    </TableCell>
  ));

  const data = rowData.map((item) => {
    return (
      <RowItemLead
        key={item.id}
        item={item}
        onShowDeleteDialog={onShowDeleteDialog}
      />
    );
  });

  return (
    <Paper sx={{ borderRadius: "0px" }}>
      <TableContainer
        sx={{ minWidth: 700 }}
        arial-aria-labelledby="customized table"
      >
        <Table stickyHeader>
          <TableHead sx={{ background: "black" }}>
            <TableRow
              sx={{
                "& th": {
                  color: "rgba(200,200,200)",
                  backgroundColor: "#404040",
                },
              }}
            >
              {headers}
            </TableRow>
          </TableHead>
          <TableBody>{data}</TableBody>
        </Table>
      </TableContainer>
      <CustomTablePagination count={rowData.length} />
    </Paper>
  );
};
