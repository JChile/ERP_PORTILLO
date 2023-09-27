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


<<<<<<< HEAD:client/src/components/CustomTable.jsx
=======
/**
 * 
 * @param {list} headerData 
 * @param {list} rowData  
 * @returns 
 */
>>>>>>> 2ddbbecf17eea765e6ed83f96ac1ec516b7c2748:client/src/components/CustomLeadTable.jsx
export const CustomTable = ({ headerData, rowData }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  
  // MOSTRAR Y OCULTAR DETALLE DE USUARIO
  const onShowDeleteDialog = async (item) => {
    setItemSeleccionado(item);
    setShowDialog(true);
  };
  const headers = headerData.map((header, index) => (
    <TableCell key={index} align="left" width={60}>
      <b>{header}</b>
    </TableCell>
  ));

  const data = rowData.map((item) => {
    return <RowItemLead
      key={item.id}
      item={item}
      onShowDeleteDialog={onShowDeleteDialog}
    />;
  });

  return (
    <Paper>
      <TableContainer
        sx={{ minWidth: 700 }}
        arial-aria-labelledby="customized table"
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "rgba(96,96,96)",
                  backgroundColor: "#f5f5f5",
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
