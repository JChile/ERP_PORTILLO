import React from "react";

export const NoAccessLeads = () => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Acceso denegado: </strong>
      <span className="block sm:inline">
        Para consultar esta información, necesitas tener un rol asesor o
        marketing.
      </span>
    </div>
  );
};
