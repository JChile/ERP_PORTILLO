import React, { useEffect, useState, useContext } from "react";
import {
  deleteProducto,
  getProductosActivos,
  getProductosInactivos,
} from "../helpers";
import { Link } from "react-router-dom";
import { DialogDeleteProducto } from "../components";
import {
  CustomCircularProgress,
  CustomTablePagination,
} from "../../../components";
import { AuthContext } from "../../../auth";
import { CustomInputBase } from "../../../components/CustomInputBase";
import { Button } from "@mui/material";
import { MdAdd, MdHdrPlus, MdPlusOne } from "react-icons/md";
import { CustomTableProducto } from "../../../components/CustomTableProducto";

export const ListProductos = () => {
  const { authTokens } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [productosTemporal, setProductosTemporal] = useState([]);

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

  const obtenerProductos = async () => {
    setVisibleProgress(true);
    try {
      let result = [];
      if (activeButton) {
        result = await getProductosActivos({ authToken: authTokens["access"] });
      } else {
        result = await getProductosInactivos({
          authToken: authTokens["access"],
        });
      }
      setProductos(result);
      setProductosTemporal(result);
      setVisibleProgress(false);
    } catch (error) {
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

  const onDeleteItemSelected = async (item) => {
    const { id, proyecto, tipo } = item;
    const body = {
      estado: "I",
      proyecto: proyecto.id,
      tipo: tipo.id,
    };
    try {
      const result = await deleteProducto(id, body);
      obtenerProductos();
      onCloseDeleteDialog();
    } catch (error) {
      // handled error.
    }
  };

  const handleSearchButton = (pattern) => {
    const filteredData = productos.filter((item) => {
      const { nombre, proyecto } = item;
      const projectName = proyecto.nombre.toLowerCase();
      const searchPattern = pattern.toLowerCase();

      return (
        nombre.toLowerCase().includes(searchPattern) ||
        projectName.includes(searchPattern)
      );
    });
    setProductosTemporal(filteredData);
  };

  useEffect(() => {
    setVisibleProgress(true);
    const controller = new AbortController();
    obtenerProductos();
    setVisibleProgress(false);
    return () => controller.abort();
  }, [activeButton]);

  const filters = ["Nombre", "Proyecto"];

  return (
    <>
      <div className="flex items-center justify-between gap-x-4 mb-9">
        <div className="flex flex-col gap-y-1 align-middle">
          <CustomInputBase
            onSearch={handleSearchButton}
            placeholder="Buscar producto..."
          />
        </div>

        <div className="flex flex-col gap-y-1 align-middle">
          <div className="flex justify-center gap-x-3">
            <Button
              variant="contained"
              sx={{
                borderRadius: "0px",
                textTransform: "capitalize",
                backgroundColor: activeButton ? "#1976d2" : "#d1d5db",
                color: activeButton ? "white" : "black",
              }}
              onClick={() => handleButtonState(true)}
            >
              Activas
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: "0px",
                textTransform: "capitalize",
                backgroundColor: !activeButton ? "#1976d2" : "#d1d5db",
                color: !activeButton ? "white" : "black",
              }}
              onClick={() => handleButtonState(false)}
            >
              Inactivas
            </Button>
            <Link to={"/producto/create/"}>
              <Button
                endIcon={<MdAdd />}
                color="inherit"
                variant="contained"
                sx={{ borderRadius: "0px", textTransform: "capitalize" }}
              >
                Crear
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <CustomTableProducto
        headerData={[
          { name: "Acciones", width: 10 },
          { name: "Nombre", width: 150 },
          { name: "Código", width: 70 },
          { name: "Numero", width: 80 },
          { name: "Area", width: 100 },
          { name: "Tipo", width: 70 },
          { name: "Proyecto", width: 70 },
        ]}
        rowData={productosTemporal}
        onShowDeleteDialog={onShowDeleteDialog}
      />

      {showDialog && (
        <DialogDeleteProducto
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
