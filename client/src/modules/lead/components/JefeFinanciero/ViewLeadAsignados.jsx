import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth";
import { getLeads } from "../../helpers";
import RowItemLeadAsignado from "./RowItemLeadAsignado";
import { MdSearch } from "react-icons/md";
import { quitarLeads } from "../../helpers/desasignarLeads";

const ViewLeadAsignados = () => {
  const { authTokens } = useContext(AuthContext);
  const [leadAsignados, setLeadsAsignados] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    const state = event.target.checked;
    setChecked(state);
    const leadsChecked = leadAsignados.map((element) => {
      return {
        ...element,
        isSelected: state,
      };
    });
    setLeadsAsignados(leadsChecked);
  };

  const traerLeadAsiganados = async () => {
    const rowData = await getLeads(authTokens["access"], "asignado=True");
    const processData = rowData.map((element) => {
      return {
        ...element,
        isSelected: false,
      };
    });
    setLeadsAsignados(processData);
  };

  const updateLeadAsignado = (index, isSelected) => {
    const updatedLeads = [...leadAsignados];
    updatedLeads[index].isSelected = isSelected;
    setLeadsAsignados(updatedLeads);
  };

  const desasignarLeads = async () => {
    const selectedLeads = leadAsignados.filter((item) => item["isSelected"]);
    const leadsId = selectedLeads.map((item) => item.id);
    console.log(selectedLeads)
    const result = await quitarLeads(authTokens["access"], { "lead": leadsId });
  };

  useEffect(() => {
    traerLeadAsiganados();
  }, []);

  return (
    <Paper sx={{ borderRadius: "0px" }}>
      <Button onClick={desasignarLeads}>Quitar Leads</Button>
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
                  backgroundColor: "#404040",
                  color: "whitesmoke",
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
              <TableCell>Número</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Campaña</TableCell>
              <TableCell>Proyecto</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Asesor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
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
              <TableCell>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Número"
                  type="number"
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  placeholder="Nombre"
                  size="small"
                  type="text"
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  placeholder="Campaña"
                  size="small"
                  type="text"
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  placeholder="Proyecto"
                  size="small"
                  type="text"
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  placeholder="Estado"
                  size="small"
                  type="text"
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  placeholder="Asesor"
                  size="small"
                  type="text"
                />
              </TableCell>
            </TableRow>
            {leadAsignados.map((item, index) => (
              <RowItemLeadAsignado
                item={item}
                key={index}
                index={index}
                updateLeadAsignado={updateLeadAsignado}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ViewLeadAsignados;
