import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiFileExcel2Fill } from "react-icons/ri";
import { deleteLead, getLeadsActivos } from "../helpers";
import {
  CustomCircularProgress,
  CustomTablePagination,
} from "../../../components";
import { CustomTopBar } from "../../../components/CustomTopBar";
import { FilterEstadoLead } from "../../../components/filters/estado/FilterEstadoLead";
import { CustomTable } from "../../../components/CustomLeadTable";
import { Input } from "@mui/material";
import { CustomInputBase } from "../../../components/CustomInputBase";
import { CustomSelectedTable } from "../components/CustomSelectedTable";
import { DialogDeleteLead } from "../components/DialogDeleteLead";
import { HiUserGroup } from "react-icons/hi";

const headers = [
  { name: "Acciones", width: 20 },
  { name: "Nombre", width: 120 },
  { name: "Celular", width: 100 },
  { name: "Estado", width: 40 },
  { name: "Campaña", width: 120 },
  { name: "Entrega", width: 50 },
];

const filters = ["Nombre", "Estado", "Campaña"];

const headersLead = ["Acciones", "Nombre", "Celular", "Campaña"];

export const ListLeads = () => {
  const [filterLeads, setFilterLeads] = useState([]);
  const [leads, setLeads] = useState([]);
  const [visibleProgress, setVisibleProgress] = useState(true);
  const [unassigendLeadsTable, setUnassignedLeadsTable] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  const onCloseDeleteDialog = () => {
    // ocultamos el modal
    setShowDialog(false);
    // dejamos el null la data del detalle
    setItemSeleccionado(null);
  };
  const onShowDeleteDialog = (item) => {
    setItemSeleccionado(item);
    setShowDialog(true);
  };

  const onDeleteItemSelected = async (item) => {
    const { id, celular } = item;
    const body = {
      estado: "I",
      celular: celular,
    };
    console.log(body);
    const result = await deleteLead(id, body);
    console.log(result);
    loadLeads();
    onCloseDeleteDialog();
  };

  const loadLeads = async () => {
    const data = await getLeadsActivos();
    setLeads(data);
    setFilterLeads(data);
  };

  const handleSearchButton = (filter, pattern) => {
    const filterValue = filters.find((element) => element === filter);

    if (!filterValue) return;

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

  const toogleStateLeads = () => {
    let toggleStateLeads = [];
    /** mostrar lista de leads sin asignar */
    if (!unassigendLeadsTable) {
      toggleStateLeads = leads.filter((item) => item.activo);
    } else {
      /** mostrar lista de leads los cuales son  */
      toggleStateLeads = leads.filter((item) => !item.activo);
    }
    setFilterLeads(toggleStateLeads);
    setUnassignedLeadsTable((prev) => !prev);
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
      <div className="flex flex-col gap-y-1 items-end">
        <div className="flex gap-x-2">
          <Link
            to={"/lead/create"}
            className="bg-lime-400 hover:bg-lime-600 text-white-500 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
          >
            <HiUserGroup className="mr-2" />
            Añadir Manual
          </Link>

          <Link
            to={"/lead/create/sheet"}
            className="bg-yellow-400 hover:bg-yellow-500 text-black-500 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
          >
            <RiFileExcel2Fill className="mr-2" />
            Importar
          </Link>
        </div>
      </div>

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

        <div className="flex flex-row gap-x-4 items-center">
          <div className="flex flex-col gap-y-1">
            <Link
              to={"/lead/asign"}
              className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Asignar Asesor
            </Link>
          </div>
        </div>
      </div>

      <div className="px-7">
        {!unassigendLeadsTable ? (
          <CustomTable
            headerData={headers}
            rowData={filterLeads}
            onShowDeleteDialog={onShowDeleteDialog}
          />
        ) : (
          <CustomSelectedTable headerData={headersLead} rowData={filterLeads} />
        )}
      </div>

      {showDialog && (
        <DialogDeleteLead
          item={itemSeleccionado}
          showDialog={showDialog}
          onDeleteItemSelected={onDeleteItemSelected}
          onCloseDeleteDialog={onCloseDeleteDialog}
        />
      )}

      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
