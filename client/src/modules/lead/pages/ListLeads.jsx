import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiFileExcel2Fill } from "react-icons/ri";
import { deleteLead } from "../helpers";
import { CustomCircularProgress } from "../../../components";
import { CustomTable } from "../../../components/CustomLeadTable";
import { CustomInputBase } from "../../../components/CustomInputBase";
import { CustomSelectedTable } from "../components/CustomSelectedTable";
import { DialogDeleteLead } from "../components/DialogDeleteLead";
import { HiUserGroup } from "react-icons/hi";
import { Button } from "@mui/material";
import { AuthContext } from "../../../auth";
import { IconButton } from "@mui/material";
import { combinarErrores } from "../../../utils";

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
  const { authTokens } = useContext(AuthContext);
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
    try {
      console.log(body);
      const result = await deleteLead(id, body, authTokens["access"]);
      console.log(result);
      loadLeads();
      onCloseDeleteDialog();
    } catch (error) {
      // ocultar el progress
      setVisibleProgress(false);
      const pilaError = combinarErrores(error);
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
  };

  const loadLeads = async () => {
    const data = await getLeadsActivos(authTokens.access);
    console.log(data);
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
    setVisibleProgress(true);
    loadLeads();
    setVisibleProgress(false);
  }, []);

  return (
    <>
      <div className="px-7">
        {!unassigendLeadsTable ? (
          <CustomTable
            headerData={headers}
            rowData={filterLeads}
            onDeleteItemSelected={onDeleteItemSelected}
          />
        ) : (
          <CustomSelectedTable headerData={headersLead} rowData={filterLeads} />
        )}
      </div>
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
