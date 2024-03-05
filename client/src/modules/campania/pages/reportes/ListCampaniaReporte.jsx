import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const data = {
  campaign_info: [
    {
      mkt: "WHATSAPP",
      weeks: [
        { leads: 12, investment: 12.2 },
        { leads: 12, investment: 12.2 },
        { leads: 12, investment: 12.2 },
        { leads: 12, investment: 12.2 },
        { leads: 12, investment: 12.2 },
      ],
    },
    {
      mkt: "LLAMADA",
      weeks: [
        { leads: 1, investment: 0.0 },
        { leads: 1, investment: 0.0 },
        { leads: 1, investment: 0.0 },
        { leads: 1, investment: 0.0 },
        { leads: 1, investment: 0.0 },
      ],
    },
  ],
};

export default function ListCampaniaReportes() {
  return (
    <div>
      <h1 className="text-2xl uppercase">{`Cuadro de inversión campañas - ${"Alamos"}`}</h1>
      <CampaignTable campaignInfo={data.campaign_info} />
    </div>
  );
}

const CampaignTable = ({ campaignInfo }) => {
  // Función para obtener las cabeceras de la tabla
  const getTableHeaders = () => {
    let campaignLength = 0;
    const headers = ["Campaña"];
    const [firstCampaign = null] = campaignInfo;
    if (firstCampaign != null) {
      campaignLength = firstCampaign.weeks.length;
    }
    for (let i = 0; i < campaignLength; i++) {
      headers.push(`Semana ${i + 1}`);
      headers.push(`Inversión ${i + 1}`);
    }

    return headers;
  };

  // Función para obtener las filas de la tabla
  const getTableRows = () => {
    const rows = [];
    const weeklyReport = [];
    let indexI = 0;
    let indexJ = 1;

    campaignInfo.forEach((campaign) => {
      const rowData = [campaign.mkt];
      campaign.weeks.forEach((week) => {
        rowData.push(week.leads);
        rowData.push(week.investment);
        if (!weeklyReport[indexI]) weeklyReport[indexI] = 0;
        if (!weeklyReport[indexJ]) weeklyReport[indexJ] = 0;
        weeklyReport[indexI] += week.leads;
        weeklyReport[indexJ] += week.investment;
        indexI += 2;
        indexJ += 2;
      });
      indexI = 0;
      indexJ = 1;
      rows.push(rowData);
    });

    const totalRow = ["MKT TOTAL", ...weeklyReport];
    rows.push(totalRow);
    return rows;
  };

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
            {getTableHeaders().map((header, index) => (
              <TableCell key={index} align="center" className="font-medium">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {getTableRows().map((row, rowIndex) => (
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
