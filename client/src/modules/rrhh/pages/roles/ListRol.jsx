import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiUserAddLine } from "react-icons/ri";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RowItemRol } from "./components/RowItemRol";
import { getRoles } from "./helpers";

export const ListRol = () => {
  const [listRoles, setListRoles] = useState([]);

  const obtenerRoles = async () => {
    const result = await getRoles();
    setListRoles(result);
  };

  useEffect(() => {
    obtenerRoles();
  }, []);

  return (
    <>
      <div className="flex items-center justify-end bg-gray-100 p-4">
        <Link
          to={"/rrhh/roles/create"}
          className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
        >
          <RiUserAddLine className="mr-2" /> Añadir Rol
        </Link>
      </div>
      <Paper className="mt-4">
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    color: "rgba(96, 96, 96)",
                    backgroundColor: "#f5f5f5",
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
              {listRoles.map((item) => (
                <RowItemRol key={item.id} item={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
