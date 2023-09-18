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
export const CustomTable = ({ headerData, rowData }) => {
  const headers = headerData.map((header, index) => (
    <TableCell key={index} align="left" width={60}>
      <b>{header}</b>
    </TableCell>
  ));

  const data = rowData.map((item) => {
    return <RowItemLead key={item.id} item={item} />;
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
