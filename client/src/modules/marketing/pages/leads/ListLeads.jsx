import React from "react";
import { Link } from "react-router-dom";

export const ListLeads = () => {
  return (
    <div>
      <Link to={"/marketing/lead/create"}>Agregar manualmente</Link>
      <Link to={"/marketing/lead/create/sheet"}>Agregar automaticamente</Link>

      

    </div>
  );
};
