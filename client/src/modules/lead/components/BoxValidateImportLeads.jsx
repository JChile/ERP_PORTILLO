import React, { useState } from "react";

export const BoxValidateImportLeads = ({ onClose, onImportLeads, errors }) => {
  console.log(errors);
  const [esConErrores, setEsConErrores] = useState(false);

  // check box errores change
  const handleCheckboxErroresChange = (event) => {
    setEsConErrores(event.target.checked);
  };

  const importData = () => {
    onImportLeads(esConErrores);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="w-4/5 h-5/6 bg-white border border-gray-300 shadow-md rounded">
        <h2 className="text-center mb-3 mt-2 font-bold">Verificación</h2>
        <div className="bg-yellow-200 p-2 mt-2 rounded">
          Por defecto, solo se importaran los leads sin errores de validación.
          Todos los errores encontrados seran exportados en un excel.
        </div>
        <div className="mt-2 mb-4 px-4 flex items-center justify-center	space-x-4">
          <div className="flex items-center">
            <label htmlFor="automatico" className="block font-semibold mb-1">
              ¿Importar con errores?
            </label>
            <input
              type="checkbox"
              checked={esConErrores}
              onChange={handleCheckboxErroresChange}
              className="ml-2"
            />
          </div>
        </div>
        <div className="h-3/5 overflow-y-auto bg-gray-100 px-4">
          <ul className="space-y-4">
            {errors.length === 0 ? (
              <h1 className="text-center text-lime-800 font-bold">
                No hay errores
              </h1>
            ) : (
              errors.map((item, index) => (
                <li key={index}>
                  <div className="bg-red-200 text-red-800 px-2 py-1 rounded">
                    <p className="font-bold">{`Celular: ${item.data.celular}`}</p>
                    <ul className="list-disc pl-6">
                      {item.errores.map((error, indexError) => (
                        <li key={`${index} - ${indexError}`}>
                          <p>{error}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))
            )}
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
