import React from "react";
import { Link } from "react-router-dom";

export const ReportesHome = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Bienvenidos a ERP Portillo</h1>
      <p className="text-lg">
        Transformamos la gestión de tu empresa para un futuro exitoso.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Reportes Lead Status</h2>
          <Link
            className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
            to="/reportes/leadStatus"
          >
            Ingresar
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Reportes Desasignaciones</h2>
          <Link
            className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
            to="/reportes/desasignacion"
          >
            Ingresar
          </Link>
        </div>
        {/**
         <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
           <h2 className="text-xl font-bold mb-2">Reportes Retorno Campaña</h2>
           <Link
             className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
             to="/reportes/retornoCampania"
           >
             Ingresar
           </Link>
         </div>
         */
        }
      </div>
    </div>
  );
};
