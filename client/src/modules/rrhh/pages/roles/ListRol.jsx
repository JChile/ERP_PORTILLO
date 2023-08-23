import React, { useState, useEffect } from "react";
import RolItem from "./components/RolItem";
import { getRoles } from "./helpers/getRoles";
import { Link } from "react-router-dom";

export const ListRol = () => {
  const [listRoles, setListRoles] = useState([]);
  const obtenerRoles = async () => {
    const result = await getRoles();
    setListRoles(result);
  };

  useEffect(() => {
    obtenerRoles();
    return () => {};
  }, [openForm]);

  return (
    <div className="flex flex-col gap-y-6 items-center">
      <h1 className="text-center font-semibold text-2xl">Gestión de Roles</h1>
      <div className="w-4/5  max-w-screen-sm">
        {/* por ahora esta asi. */}
        {/* <Link to="/rrhh/roles/create"> */}
        <Link to={"/rrhh/roles/create"}>Agregar rol</Link>
        {/* </Link> */}
      </div>
      <div className="w-4/5 max-w-screen-sm flex flex-col gap-y-4">
        {listRoles.map((item) => (
          <RolItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
