import React from "react";
import "./rolItem.css";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { CustomMoreVerticalActions } from "../../../components";
import { BsShieldFillX } from "react-icons/bs";

export const RowItemRol = ({ item }) => {
  const navigate = useNavigate();

  const onEditItemSelected = () => {
    navigate(`/rol/update/${item.id}`);
  };

  const { permissions } = item;

  const getModulosPermisos = () => {
    const descriptionPermissions = permissions
      .map((element) => element["name"])
      .join(", ");
    // Utilizar una expresión regular para encontrar las ocurrencias de "Can view" seguido de un espacio y capturar la siguiente palabra
    const regex = /Can view (\w+)/g;
    const matches = [...descriptionPermissions.matchAll(regex)];

    // Obtener el tercer término de cada coincidencia
    const tercerTermino = matches.map((match) => match[1]);

    // Eliminar duplicados del arreglo
    const resultados = [...new Set(tercerTermino)].join(", ");
    return resultados;
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell align="center">
        {item["name"] !== "asesor" &&
        item["name"] !== "administrador" &&
        item["name"] !== "marketing" ? (
          <CustomMoreVerticalActions
            onEdit={onEditItemSelected}
            activeOnDelete={false}
            activeOnEdit={
              item["name"] !== "asesor" &&
              item["name"] !== "administrador" &&
              item["name"] !== "marketing"
            }
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BsShieldFillX size={30} color="#db1a1a" />
          </div>
        )}
      </TableCell>
      <TableCell>
        <Link
          className="text-blue-500"
          to={`/rol/detail/${item.id}`}
        >{`${item.name}`}</Link>
      </TableCell>
      <TableCell>{getModulosPermisos()}</TableCell>
    </TableRow>
  );
};
