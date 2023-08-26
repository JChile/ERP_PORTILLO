import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiAddBoxFill } from "react-icons/ri";
import {
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
} from "@mui/material";
import { getLeads } from "../helpers";
import { RowItemLead } from "../components";
import {
  CustomCircularProgress,
  CustomTablePagination,
} from "../../../components";

export const ListLeads = () => {
  const [leads, setLeads] = useState([]);
  const [visibleProgress, setVisibleProgress] = useState(true);

  const loadLeads = async () => {
    const data = await getLeads();
    setLeads(data);
  };

  useEffect(() => {
    const controller = new AbortController();
    setVisibleProgress(true);
    loadLeads();
    setVisibleProgress(false);
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="p-3 flex flex-col gap-x-5 mb">
        <h1 className="text-lg font-bold">Leads</h1>
      </div>

      <div className="flex gap-x-6 items-center my-6 justify-center">
        <Link
          to={"/lead/create"}
          className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
        >
          <RiAddBoxFill className="mr-2" />
          Agregar manualmente
        </Link>

        <Link
          to={"/lead/create/sheet"}
          className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
        >
          <RiAddBoxFill className="mr-2" />
          Agregar automaticamente
        </Link>
      </div>

      <Paper>
        {/*
        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={() => {
              handleButtonState(true);
              filtrar("filter_active_campaign");
            }}
            className={`px-4 py-2 mr-2 rounded ${
              activeButton ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Campañas activas
          </button>
          <button
            onClick={() => {
              handleButtonState(false);
              filtrar("filter_inactive_campaign");
            }}
            className={`px-4 py-2 mr-2 rounded ${
              !activeButton ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Campañas inactivas
          </button>
        </div>
              */}
        <TableContainer
          sx={{ minWidth: 700 }}
          arial-aria-labelledby="customized table"
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    color: "rgba(96,96,96)",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell align="left" width={30}>
                  <b>Acciones</b>
                </TableCell>
                <TableCell align="left" width={220}>
                  <b>Nombre</b>
                </TableCell>
                <TableCell align="left" width={50}>
                  <b>Celular</b>
                </TableCell>
                <TableCell align="left" width={140}>
                  <b>Estado</b>
                </TableCell>
                <TableCell align="left" width={160}>
                  <b>Objeciones</b>
                </TableCell>
                <TableCell align="left" width={160}>
                  <b>Campaña</b>
                </TableCell>
                <TableCell align="left" width={140}>
                  <b>Comentario</b>
                </TableCell>
                <TableCell align="left" width={160}>
                  <b>Hora de entrega</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((item) => {
                return <RowItemLead key={item.id} item={item} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomTablePagination count={leads.length} />
      </Paper>

      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
