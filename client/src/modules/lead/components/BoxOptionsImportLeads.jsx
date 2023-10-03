import React, { useState } from "react";
import { FilterProyectos } from "../../../components";

export const BoxOptionsImportLeads = ({ onClose, onImportFileLeads }) => {
  const [valuesOptions, setValuesOptions] = useState({
    proyecto: null,
    rangoDesde: 2,
    rangoHasta: 3,
    asignacion_automatica: false,
  });

  const { proyecto, rangoDesde, rangoHasta, asignacion_automatica } =
    valuesOptions;

  const onAddProyecto = ({ id }) => {
    setValuesOptions({
      ...valuesOptions,
      proyecto: id,
    });
  };

  const handleInputs = ({ target }) => {
    const { name, value } = target;
    setValuesOptions({
      ...valuesOptions,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    setValuesOptions({
      ...valuesOptions,
      asignacion_automatica: event.target.checked,
    });
  };

  const importarDatos = () => {
    if (
      rangoDesde < rangoHasta &&
      rangoDesde > 1 &&
      rangoHasta > 2 &&
      rangoDesde !== rangoHasta
    ) {
      if (proyecto !== null) {
        onImportFileLeads(valuesOptions);
      } else {
        console.log("Proporcione un proyecto");
      }
    } else {
      console.log("Rango incorrecto");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="w-1/3 bg-white border border-gray-300 shadow-md rounded overflow-hidden">
        <div className="flex justify-end items-center bg-gray-200 p-2 border-b border-gray-300">
          <button className="text-red-600 font-bold" onClick={onClose}>
            Cerrar
          </button>
        </div>
        <div className="p-4">
          <div className="mb-5">
            <label htmlFor="proyecto" className="block font-semibold mb-1">
              Proyecto
            </label>
            <FilterProyectos id="proyecto" onNewInput={onAddProyecto} />
          </div>
          <div className="mb-5">
            <div>
              <label className="block font-semibold mb-1">
                Rango de filas:
              </label>
              <div className="flex justify-center items-center mt-3">
                <label htmlFor="desde" className="mr-2">
                  Desde:
                </label>
                <input
                  type="number"
                  id="desde"
                  name="rangoDesde"
                  value={rangoDesde}
                  onChange={handleInputs}
                  placeholder="Desde"
                  className="border border-gray-300 p-1 rounded-l mr-2 w-16"
                />
                <label htmlFor="hasta" className="mr-2">
                  Hasta:
                </label>
                <input
                  type="number"
                  id="hasta"
                  name="rangoHasta"
                  value={rangoHasta}
                  onChange={handleInputs}
                  placeholder="Hasta"
                  className="border border-gray-300 p-1 rounded-r w-16"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="automatico" className="block font-semibold mb-1">
              ¿Asignación automática?
            </label>
            <input
              type="checkbox"
              id="automatico"
              value={asignacion_automatica}
              onChange={handleCheckboxChange}
              className="ml-2"
            />
          </div>
          <div className="mb-4 flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={importarDatos}
            >
              Importar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
