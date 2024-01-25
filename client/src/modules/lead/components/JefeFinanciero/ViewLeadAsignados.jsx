import {
  Button,
  Checkbox,
  IconButton,
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
import { getLeads } from "../../helpers";
import RowItemLeadAsignado from "./RowItemLeadAsignado";
import { MdHourglassTop, MdSearch } from "react-icons/md";

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
    const result = await getLeads(authTokens["access"], "asignado=True");
    setLeadsAsignados(result);
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
              <TableCell>Campaña</TableCell>
              <TableCell>Proyecto</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Asesor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell>
              <Button
                startIcon={<MdSearch />}
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "0px",
                }}
                color="success"
                variant="contained"
              >
                Buscar
              </Button>
            </TableCell>

            {leadAsignados.map((item, index) => (
              <RowItemLeadAsignado item={item} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ViewLeadAsignados;
