import React, { useContext, useEffect, useState } from "react";
import { getLeadsNoAsignados } from "../../helpers";
import { AuthContext } from "../../../../auth";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RowItemLeadNoAsignado } from "./RowItemLeadNoAsignado";

export const ViewLeadsNoAsignados = () => {
  const { authTokens } = useContext(AuthContext);
  const [leadsNoAsignados, setLeadsNoAsignados] = useState([]);
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    const state = event.target.checked;
    setChecked(state);
    const leadsChecked = leadsNoAsignados.map((element) => {
      return {
        ...element,
        isSelected: state,
      };
    });

    setLeadsNoAsignados(leadsChecked);
  };

  const traerInformacionLeadNoAsociados = async () => {
    const result = await getLeadsNoAsignados(authTokens["access"]);
    console.log(result);
    const formatData = result.map((element) => {
      return {
        ...element,
        isSelected: false,
      };
    });
    setLeadsNoAsignados(formatData);
  };

  useEffect(() => {
    traerInformacionLeadNoAsociados();
  }, []);
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
              <TableCell>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </TableCell>
              <TableCell>Numero</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leadsNoAsignados.map((item, index) => (
              <RowItemLeadNoAsignado item={item} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
