import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  Checkbox,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export const CustomSelectedTable = ({ headerData, rowData }) => {


  return (
    <Paper>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={true ? "small" : "medium"}
        >
          <TableHead>
            <TableRow>
              <TableCell>Titulo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRow
              hover
              //   onClick={(event) => handleClick(event, row.name)}
              //   role="checkbox"
              //   aria-checked={isItemSelected}
              //   tabIndex={-1}
              //   key={row.name}
              //   selected={isItemSelected}
              //   sx={{ cursor: "pointer" }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  //   checked={isItemSelected}
                  //   inputProps={{
                  //     "aria-labelledby": labelId,
                  //   }}
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.name}
              </TableCell>
              <TableCell align="right">Tarea</TableCell>
              <TableCell align="right">Tarea</TableCell>
              <TableCell align="right">Tarea</TableCell>
              <TableCell align="right">Tarea</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
};
