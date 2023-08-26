import React, { useState } from "react";

export const AddLeadManual = () => {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [numeroCelular, setNumeroCelular] = useState("");
  const [campania, setCampania] = useState("");
  const [comentario, setComentario] = useState("");
  const [asesorAsignado, setAsesorAsignado] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... (envío de datos)
  };
  const handleCancelar = (e) => {
    e.preventDefault();
    // ...
  };

  return (
    <div className="relative border-2 rounded-md border-inherit p-5">
      <h1 className="text-lg font-bold">Añadir lead manualmente</h1>
      <hr className="my-4"></hr>
      <form onSubmit={handleSubmit} className="min-w-[242px] flex gap-x-8">
        <div className="flex-1 flex flex-col gap-y-6">
          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Nombre</span>
            <input
              type="text"
              name="nombre"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"

              // Resto del código del input
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Apellido Paterno</span>
            <input
              type="text"
              name="apellidoPaterno"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"

              // Resto del código del input
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Apellido Materno</span>
            <input
              type="text"
              name="apellidoMaterno"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"

              // Resto del código del input
            />
          </label>
        </div>

        <div className="flex-1 flex flex-col gap-y-6">
          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Número Celular</span>
            <input
              type="text"
              name="numeroCelular"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={numeroCelular}
              onChange={(e) => setNumeroCelular(e.target.value)}
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Campaña</span>
            <select
              name="campania"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={campania}
              onChange={(e) => setCampania(e.target.value)}
            >
              <option value="">Selecciona una campaña</option>
              {/* Agrega opciones de campaña aquí */}
            </select>
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Asesor Asignado</span>
            <select
              name="asesorAsignado"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={asesorAsignado}
              onChange={(e) => setAsesorAsignado(e.target.value)}
            >
              <option value="">Selecciona un asesor</option>
              {/* Agrega opciones de asesor aquí */}
            </select>
          </label>
        </div>
      </form>

      <label className="block flex flex-col gap-y-1 mt-6">
        <span className="block text-sm font-medium">Comentario</span>
        <textarea
          name="comentario"
          rows="3"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        ></textarea>
      </label>

      <div className="mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
          type="submit"
          onClick={handleSubmit}
        >
          Guardar
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
          type="button"
          onClick={handleCancelar}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
