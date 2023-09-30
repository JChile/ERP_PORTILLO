import React, { useEffect, useState } from "react";
import { getCampanias, deleteCampania } from "../helpers";
import { Link } from "react-router-dom";
import { DialogDeleteCampania, RowItemCampania } from "../components";
import {
  CustomCircularProgress,
  CustomTablePagination,
} from "../../../components";
import { CustomTopBar } from "../../../components/CustomTopBar";
import { CustomInputBase } from "../../../components/CustomInputBase";
import { CustomTableCampanias } from "../../../components/CustomTableCampanias";

export const ListCampanias = () => {
  // Informaciion de las campanias.
  const [campanias, setCampanias] = useState([]);
  const [campaniasTemporal, setCampaniasTemporal] = useState([]);

  // Retroalimentacion, estado de progreso.
  const [visibleProgress, setVisibleProgress] = useState(true);

  // Control de bottones, campanias activas e inactivas.
  const [activeButton, setActiveButton] = useState(true);

  const [showDialog, setShowDialog] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  // PARA ELIMINAR UN ITEM SELECCIONADO
  const onCloseDeleteDialog = () => {
    // ocultamos el modal
    setShowDialog(false);
    // dejamos el null la data del detalle
    setItemSeleccionado(null);
  };

  // MOSTRAR Y OCULTAR DETALLE DE USUARIO
  const onShowDeleteDialog = (item) => {
    setItemSeleccionado(item);
    setShowDialog(true);
  };

  // Manejar los estados de los filtros
  const handleButtonState = (buttonState) => {
    setActiveButton(buttonState);
  };

  // OBTENEMOS LAS CAMPAÑAS
  const obtenerCampanias = async () => {
    let result = [];
    if (activeButton) {
      result = await getCampanias("estado=A");
    } else {
      result = await getCampanias("estado=I");
    }
    setCampanias(result);
    setCampaniasTemporal(result);
  };

  const onDeleteItemSelected = async (idItem) => {
    const body = { estado: "I" };
    console.log(idItem);
    const result = await deleteCampania(idItem, body);
    obtenerCampanias();
    onCloseDeleteDialog();
  };

  const handleSearchButton = (filter, pattern) => {
    const filteredValue = filters.find((element) => element === filter);
    if (!filteredValue) return;

    switch (filteredValue) {
      case "Nombre": {
        const filteredData = campanias.filter((item) => {
          const { nombre } = item;
          return nombre.toLowerCase().includes(pattern.toLowerCase());
        });
        setCampaniasTemporal(filteredData);
        break;
      }
      case "Proyecto": {
        const filteredData = campanias.filter((item) => {
          const { proyecto } = item;
          const { nombre } = proyecto;
          return nombre.toLowerCase().includes(pattern.toLowerCase());
        });
        setCampaniasTemporal(filteredData);
        break;
      }
    }
  };

  useEffect(() => {
    // Necesitamos controllar el retorno, cancelar la solicitud
    // cuando se quita el componente.
    setVisibleProgress(true);
    const controller = new AbortController();
    obtenerCampanias();
    setVisibleProgress(false);
    return () => controller.abort();
  }, [activeButton]);

  const filters = ["Nombre", "Proyecto"];

  return (
    <>
      <div className="flex items-center justify-between gap-x-4 mb-9">
        <div className="flex flex-col gap-y-1 align-middle">
          <span className="block text-sm">Buscar Campanias</span>
          <CustomInputBase
            filters={filters}
            defaultFilter={filters[0]}
            onSearch={handleSearchButton}
            placeholder="Buscar lead..."
          />
        </div>

        <div className="flex flex-col gap-y-1 align-middle">
          <span className="block text-sm">Gestion de campanias</span>
          <div className="flex justify-center gap-x-3">
            <button
              onClick={() => handleButtonState(true)}
              className={`px-4 py-2 rounded ${
                activeButton ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              Activas
            </button>
            <button
              onClick={() => handleButtonState(false)}
              className={`px-4 py-2 rounded ${
                !activeButton ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              Inactivas
            </button>
            <Link
              to={"/campania/create/"}
              className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
            >
              Crear
            </Link>
          </div>
        </div>
      </div>

      <CustomTableCampanias
        headerData={[
          { name: "Acciones", width: 20 },
          { name: "Nombre", width: 140 },
          { name: "Codigo", width: 70 },
          { name: "Fecha inicio", width: 80 },
          { name: "Proyecto", width: 100 },
          { name: "Categoria", width: 70 },
        ]}
        rowData={campaniasTemporal}
        onShowDeleteDialog={onShowDeleteDialog}
      />

      {showDialog && (
        <DialogDeleteCampania
          item={itemSeleccionado}
          showDialog={showDialog}
          onDeleteItemSelected={onDeleteItemSelected}
          onCloseDeleteDialog={onCloseDeleteDialog}
        />
      )}

      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
