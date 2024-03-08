import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../../../auth";
import { dataMapper } from "../../utils/CampaniaMapper";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FilterProyectos } from "../../../../components";

export default function ListCampaniaReportes() {
  const { authTokens } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [proyecto, setProyecto] = useState();
  const [selectedDate, setSelectedDate] = useState(dayjs(""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatQuery = `proyecto=${proyecto}&anio=${selectedDate.year()}&mes=${
      selectedDate.month() + 1
    }`;
    const info = await dataMapper({
      query: formatQuery,
      token: authTokens["access"],
    });
    setData(info);
  };

  const onAddProyecto = (item) => {
    setProyecto(item.id);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Cuadro de inversión de campañas
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="w-[25ch] ml-2">
          <FilterProyectos
            onNewInput={onAddProyecto}
            defaultValue={proyecto}
            size="medium"
          />
        </div>
        <DatePicker
          views={["month", "year"]}
          defaultValue={new Date()}
          label="Seleccione una fecha"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          sx={{ m: 1, width: "25ch" }}
        />
        <Button variant="contained" type="submit" sx={{ m: 1, width: "25ch" }}>
          Buscar
        </Button>
      </form>
      {data && <CampaignTable headers={data.header} rows={data.rows} />}
      {data && (
        <CampaignTable
          headers={data.costoLeadHeader}
          rows={data.costoLeadRows}
        />
      )}
      {data && (
        <CampaignTable
          headers={data.leadAsignadosHeader}
          rows={data.leadAsignadosRows}
        />
      )}
      {data && (
        <CampaignTable
          headers={data.costoLeadAsesorHeader}
          rows={data.costoLeadAsesorRows}
        />
      )}
    </div>
  );
}

const CampaignTable = ({ headers, rows }) => {
  return (
    <TableContainer component={Paper} className="mt-4">
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
            {headers.map((header, index) => (
              <TableCell key={index} align="center" className="font-medium">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} align="center">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
