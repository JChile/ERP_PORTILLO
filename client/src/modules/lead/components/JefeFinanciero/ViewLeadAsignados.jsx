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
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth";
import { getAsesorLeads, getLeadsActivos } from "../../helpers";

const ViewLeadAsignados = () => {
  const { authTokens } = useContext(AuthContext);
  const [leadAsignados, setLeadsAsignados] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    const state = event.target.checked;
    setChecked(state);
    const leadsChecked = setLeadsAsignados.map((element) => {
      return {
        ...element,
        isSelected: state,
      };
    });

    setLeadsAsignados(leadsChecked);
  };

  const traerLeadAsiganados = async () => {
    const result = await getLeadsActivos(authTokens["access"])
    console.log(result)
  };

  useEffect(() => {
    traerLeadAsiganados();
  }, []);


  return (
    <Paper sx={{ borderRadius: "0px" }}>
      <TableContainer
        sx={{
          minHeight: 700,
        }}
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
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ViewLeadAsignados;
