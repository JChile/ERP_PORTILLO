import React, { useState } from "react";

export const BoxValidateImportLeads = ({ onClose, onImportLeads, errors }) => {
  const [esAutomatico, setEstAutomatico] = useState(false);

  const handleCheckboxChange = (event) => {
    setEstAutomatico(event.target.checked);
  };

  const importData = () => {
    onImportLeads(esAutomatico);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="w-4/5 h-5/6 bg-white border border-gray-300 shadow-md rounded">
        <h2 className="text-center mb-3 mt-2 font-bold">Verificacion</h2>
        <div className="bg-yellow-200 p-2 mt-2 rounded">
          Si no eliges la asignación automática, el sistema tomará en cuenta la
          información del asesor proporcionada.
        </div>
        <div className="mt-2 mb-4 px-4 flex items-center">
          <label htmlFor="automatico" className="block font-semibold mb-1">
            ¿Asignación automática?
          </label>
          <input
            type="checkbox"
            checked={esAutomatico}
            onChange={handleCheckboxChange}
            className="ml-2"
          />
        </div>
        <div className="h-3/5 overflow-y-auto bg-gray-100 px-4">
          <ul className="space-y-4">
            {errors.map((item, index) => (
              <li key={index}>
                <div className="bg-red-200 text-red-800 p-2 rounded">
                  <p className="font-bold">{`Número: ${item.numero}`}</p>
                  <p>{item.error}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mx-3"
            onClick={importData}
          >
            Importar
          </button>
        </div>
      </div>
    </div>
  );
};
