import React, { useContext } from "react";
import { AuthContext } from "../auth";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { permissions } = useContext(AuthContext);
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Bienvenidos a ERP Portillo</h1>
      <p className="text-lg">
        Transformamos la gestión de tu empresa para un futuro exitoso.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {permissions.map((module, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-2">{module.title}</h2>
            <Link
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                module.permissions.can_view
                  ? ""
                  : "opacity-50 cursor-not-allowed"
              }`}
              to={`/${module["url"]}`}
              disabled={!module.permissions.can_view}
            >
              Ingresar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
