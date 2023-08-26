import React, { useEffect, useState } from "react";
import { getCampanias } from "./helpers/getCampanias";
import { deleteCampania } from "./helpers/deleteCampania";
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
import { RowItemCampania } from "./components/RowItemCampania";
import { CustomCircularProgress } from "../../../../components/CustomCircularProgress";
import { CustomTablePagination } from "../../../../components/CustomTablePagination";
import { DialogDeleteCampania } from "./components/DialogDeleteCampania";

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

  const filtrar = (nameFilter, value) => {
    let resultFilter = [];
    switch (nameFilter) {
      case "filter_active_campaign": {
        resultFilter = campanias.filter((element) => {
          return element.estado === "A";
        });
        setCampaniasTemporal(resultFilter);
        break;
      }
      case "filter_inactive_campaign": {
        resultFilter = campanias.filter((element) => {
          return element.estado === "I";
        });
        setCampaniasTemporal(resultFilter);
        break;
      }
      default:
        break;
    }
  };

  // OBTENEMOS LAS CAMPAÑAS
  const obtenerCampanias = async () => {
    const result = await getCampanias();
    setCampanias(result);
    /*Mostramos las campañas, que se encuentran activas*/
    setCampaniasTemporal(
      result.filter((item) => (item.estado === "A" ? true : false))
    );
  };

  const onDeleteItemSelected = async (idItem) => {
    const body = {
      estado: "E",
    };
    const result = await deleteCampania(idItem, body);
    obtenerCampanias();
    onCloseDeleteDialog();
  };

  useEffect(() => {
    // Necesitamos controllar el retorno, cancelar la solicitud
    // cuando se quita el componente.
    setVisibleProgress(true);
    const controller = new AbortController();
    obtenerCampanias();
    setVisibleProgress(false);
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="p-3 flex flex-col gap-x-5 mb">
        <h1 className="text-lg font-bold">Campañas de marketing</h1>
      </div>
      <div className="flex items-center justify-center">
        <Link
          to={"/marketing/campaña/create/"}
          className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
        >
          <RiAddBoxFill className="mr-2" />
          Crear campaña
        </Link>
      </div>
      <Paper>
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
                <TableCell align="left" width={140}>
                  <b>Fecha estimada</b>
                </TableCell>
                <TableCell align="left" width={140}>
                  <b>Fecha cierre</b>
                </TableCell>
                <TableCell align="left" width={160}>
                  <b>Coste estimado</b>
                </TableCell>
                <TableCell align="left" width={160}>
                  <b>Proyecto</b>
                </TableCell>
                <TableCell align="left" width={160}>
                  <b>Subcategoria</b>
                </TableCell>
                <TableCell align="left" width={160}>
                  <b>Categoria</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaniasTemporal.map((item) => (
                <RowItemCampania
                  key={item.id}
                  item={item}
                  onShowDeleteDialog={onShowDeleteDialog}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomTablePagination count={campaniasTemporal.length} />
      </Paper>

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
