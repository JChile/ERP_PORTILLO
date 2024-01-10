import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { RiUserAddLine } from "react-icons/ri";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RowItemRol } from "../components";
import { getRoles } from "../helpers";
import {
  CustomAlert,
  CustomCircularProgress,
  CustomTablePagination,
} from "../../../components";
import { useAlertMUI, useCustomTablePagination } from "../../../hooks";
import { combinarErrores } from "../../../utils";
import { TablePagination } from "@mui/material";
import { AuthContext } from "../../../auth";

export const ListRol = () => {
  const { authTokens } = useContext(AuthContext);
  const [listRoles, setListRoles] = useState([]);

  // hook alert
  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  } = useCustomTablePagination(listRoles);

  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  const obtenerRoles = async () => {
    setVisibleProgress(true);
    try {
      const result = await getRoles(authTokens["access"]);
      setListRoles(result);
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

  useEffect(() => {
    obtenerRoles();
  }, []);

  return (
    <React.Fragment>
      <div className="flex items-center justify-end bg-gray-100 p-4">
        <Link
          to={"/rol/create"}
          className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
        >
          <RiUserAddLine className="mr-2" /> Añadir Rol
        </Link>
      </div>
      <Paper sx={{ marginTop: "1rem", borderRadius: "0px" }}>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    color: "rgba(200,200,200)",
                    backgroundColor: "#404040",
                  },
                }}
              >
                <TableCell align="left" width={20}>
                  <b>Acciones</b>
                </TableCell>
                <TableCell align="left" width={200}>
                  <b>Nombre</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems.map((item) => (
                <RowItemRol key={item.id} item={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <CustomTablePagination count={listRoles.length} /> */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={listRoles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* COMPONENTE ALERTA */}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </React.Fragment>
  );
};
