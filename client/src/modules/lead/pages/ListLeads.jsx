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
import { CustomTopBar } from "../../../components/CustomTopBar";
import { FilterEstadoLead } from "../../../components/filters/estado/FilterEstadoLead";

export const ListLeads = () => {
  const [leads, setLeads] = useState([]);
  const [visibleProgress, setVisibleProgress] = useState(true);
  const [filters, setFilters] = useState({
    nombre: null,
    campania: null,
    estado: null,
  });

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

  const onAddEstadoLead = (item) => {};

  return (
    <>
      <CustomTopBar
        moduleName={"Marketing"}
        userName={"Andrew Jacabo"}
        viewName={"Control de leads"}
      />

      <div className="px-7 mt-6 flex justify-between">
        <div className="flex flex-row gap-x-2">

          <label className="block flex flex-col gap-y-1 w-36">
            <span className="block text-sm">Nombre</span>
            <FilterEstadoLead onNewInput={onAddEstadoLead} defaultValue={5} />
          </label>

          <label className="block flex flex-col gap-y-1 w-36">
            <span className="block text-sm">Estado</span>
            <FilterEstadoLead onNewInput={onAddEstadoLead} defaultValue={5} />
          </label>

          <label className="block flex flex-col gap-y-1 w-36 h-7">
            <span className="block text-sm">Campaña</span>
            <FilterEstadoLead onNewInput={onAddEstadoLead} defaultValue={5} />
          </label>

        </div>

        <div className="flex flex-col gap-y-1">
          <span className="block text-sm">Añadir Lead</span>

          <div className="flex gap-x-2">
            <Link
              to={"/lead/create"}
              className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
            >
              <RiAddBoxFill/>
              Manual
            </Link>

            <Link
              to={"/lead/create/sheet"}
              className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
            >
              <RiAddBoxFill/>
              Automatico
            </Link>
          </div>
        </div>
      </div>

      <div className="px-7">
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
      </div>

      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
