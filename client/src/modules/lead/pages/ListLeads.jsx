import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiAddBoxFill } from "react-icons/ri";
import { getLeads } from "../helpers";
import {
  CustomCircularProgress,
  CustomTablePagination,
} from "../../../components";
import { CustomTopBar } from "../../../components/CustomTopBar";
import { FilterEstadoLead } from "../../../components/filters/estado/FilterEstadoLead";
import { CustomTable } from "../../../components/CustomTable";
import { Input } from "@mui/material";
import { CustomInputBase } from "../../../components/CustomInputBase";
import { CustomSelectedTable } from "../components/CustomSelectedTable";

const headers = [
  "Acciones",
  "Nombre",
  "Celular",
  "Estado",
  "Objeciones",
  "Campaña",
  "Comentario",
  "Hora",
];

const filters = ["Nombre", "Estado", "Campaña"];

export const ListLeads = () => {
  const [filterLeads, setFilterLeads] = useState([]);
  const [leads, setLeads] = useState([]);
  const [visibleProgress, setVisibleProgress] = useState(true);
  const [unassigendLeadsTable, setUnassignedLeadsTable] = useState(false);

  const loadLeads = async () => {
    const data = await getLeads();
    setLeads(data);
    setFilterLeads(data);
  };

  const handleSearchButton = (filter, pattern) => {
    const filterValue = filters.find((element) => element === filter);
    console.log(filterValue);

    switch (filterValue) {
      case "Nombre": {
        const filteredData = leads.filter((item) => {
          const { nombre, apellido } = item;
          const joinName = `${nombre}${apellido}`;
          return joinName.toLowerCase().includes(pattern.toLowerCase());
        });
        setFilterLeads(filteredData);
        break;
      }
      case "Estado": {
        const filteredData = leads.filter((item) => {
          const { estado } = item;
          const { nombre } = estado;
          return nombre.toLowerCase().includes(pattern.toLowerCase());
        });
        setFilterLeads(filteredData);
        break;
      }
      case "Campaña": {
        const filteredData = leads.filter((item) => {
          const { campania } = item;
          const { nombre } = campania;
          return nombre.toLowerCase().includes(pattern.toLowerCase());
        });
        setFilterLeads(filteredData);
        break;
      }
    }
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
      <CustomTopBar
        moduleName={"Marketing"}
        userName={"Andrew Jacabo"}
        viewName={"Control de leads"}
      />

      <div className="px-7 mt-8 mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <span className="block text-sm">Buscar lead</span>
          <CustomInputBase
            filters={filters}
            defaultFilter={filters[0]}
            onSearch={handleSearchButton}
            placeholder="Buscar lead..."
          />
        </div>

        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col gap-y-1">
            <span className="block text-sm">Filtrar leads</span>
            <Link
              style={{
                width: "6.2rem"
              }}
              className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => setUnassignedLeadsTable((prev) => !prev)}
            >
              {unassigendLeadsTable ? "Activos" : "Inactivos"}
            </Link>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="block text-sm">Añadir Lead</span>
            <div className="flex gap-x-2">
              <Link
                to={"/lead/create"}
                className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Manual
              </Link>

              <Link
                to={"/lead/create/sheet"}
                className="bg-transparent hover:bg-blue-500 text-blue-500  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Automatico
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-7">
        {!unassigendLeadsTable ? (
          <CustomTable headerData={headers} rowData={filterLeads} />
        ) : (
          <CustomSelectedTable />
        )}
      </div>

      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};