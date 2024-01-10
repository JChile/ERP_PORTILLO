import React, { useEffect, useState } from "react";
import { getCampanias, deleteCampania } from "../helpers";
import { Link } from "react-router-dom";
import { DialogDeleteCampania, RowItemCampania } from "../components";
import {
  CustomCircularProgress,
  CustomTablePagination,
} from "../../../components";
import { CustomInputBase } from "../../../components/CustomInputBase";
import { CustomTableCampanias } from "../../../components/CustomTableCampanias";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { MdAdd, MdHdrPlus, MdPlusOne } from "react-icons/md";
import { useCustomTablePagination } from "../../../hooks";

export const ListCampanias = () => {
  // Informaciion de las campanias.
  const [campanias, setCampanias] = useState([]);
  const [campaniasTemporal, setCampaniasTemporal] = useState([]);

  // definimos el hook de pagination
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  } = useCustomTablePagination(campaniasTemporal);

  // Retroalimentacion, estado de progreso.
  const [visibleProgress, setVisibleProgress] = useState(true);

  // Control de bottones, campanias activas e inactivas.
  const [activeButton, setActiveButton] = useState(true);

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

  const onEliminarCampania = async (item) => {
    const { id, proyecto, categoria } = item;
    const body = {
      estado: "I",
      proyecto: proyecto.id,
      categoria: categoria.id,
    };
    try {
      const result = await deleteCampania(id, body);
      obtenerCampanias();
      onCloseDeleteDialog();
    } catch (error) {
      // handled error.
    }
  };

  const handleSearchButton = (pattern) => {
    const filteredData = campanias.filter((item) => {
      const { nombre, proyecto } = item;
      const projectName = proyecto.nombre.toLowerCase();
      const searchPattern = pattern.toLowerCase();

      return (
        nombre.toLowerCase().includes(searchPattern) ||
        projectName.includes(searchPattern)
      );
    });
    setCampaniasTemporal(filteredData);
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
          <CustomInputBase
            onSearch={handleSearchButton}
            placeholder="Buscar campania..."
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
            <Link to={"/campania/create/"}>
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

      {/* <CustomTableCampanias
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
      /> */}
      <Paper sx={{ borderRadius: "0px" }}>
        <TableContainer
          sx={{ minWidth: 700 }}
          arial-aria-labelledby="customized table"
        >
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
                <TableCell width={20}>Acciones</TableCell>
                <TableCell width={140}>Nombre</TableCell>
                <TableCell width={70}>Codigo</TableCell>
                <TableCell width={80}>Fecha inicio</TableCell>
                <TableCell width={100}>Proyecto</TableCell>
                <TableCell width={70}>Categoria</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems.map((item) => (
                <RowItemCampania
                  key={item.id}
                  item={item}
                  onDeleteCampania={onEliminarCampania}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* PAGINACION DE LA TABLA */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={campaniasTemporal.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
