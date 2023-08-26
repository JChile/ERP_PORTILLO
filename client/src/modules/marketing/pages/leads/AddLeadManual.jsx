import React, { useState } from 'react';
import { Checkbox } from "@mui/material";
export const AddLeadManual = () => {

  const [lead, setLead] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    comentario: "",
    horaEntrega: "",
    mensajeMarketing: "",
    llamar: 0,
    estado: "",
    objeciones: "",
    asesor: "",
    campania: "",
  });

  const{
    nombre,
    apellido,
    celular,
    comentario,
    horaEntrega,
    mensajeMarketing,
    llamar,
    estado,
    objeciones,
    asesor,
    campania,
  }=lead

  const handledForm = (e) => {
    
  };
  const handleCancelar = (e) => {
    e.preventDefault();
    // ...
  };

  return (
    <div className="relative border-2 rounded-md border-inherit p-5">
      <h1 className="text-lg font-bold">Añadir lead manualmente</h1>
      <hr className="my-4"></hr>
      <form
        method="post"
        className="min-w-[242px] flex gap-x-8"
      >
        <div className="flex-1 flex flex-col gap-y-6">
          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Nombre</span>
            <input
              type="text"
              name="nombre"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={nombre}
              onChange={handledForm}
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Apellido</span>
            <input
              type="text"
              name="apellido"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={apellido}
              onChange={handledForm}
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Celular</span>
            <input
              type="text"
              name="celular"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={celular}
              onChange={handledForm}
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Hora de Entrega</span>
            <input
              type="text"
              name="horaEntrega"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={horaEntrega}
              onChange={handledForm}
            />
          </label>

          <label className="block flex flex-row gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium flex items-center me-2">
                Llamar
              </span>
              <Checkbox
                checked={llamar}
                onChange={handledForm}
                inputProps={{ "aria-label": "controlled" }}
              />
          </label>
        </div>

        <div className="flex-1 flex flex-col gap-y-6">
        <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Estado</span>
            <select
              name="estado"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={estado}
              onChange={handledForm}
            >
              <option value="">Selecciona un estado</option>
              {}
            </select>
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Objeciones</span>
            <select
              name="objeciones"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={objeciones}
              onChange={handledForm}
            >
              <option value="">Selecciona una objecion</option>
              {}
            </select>
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Asesor Asignado</span>
            <select
              name="asesorAsignado"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={asesor}
              onChange={handledForm}
            >
              <option value="">Selecciona un asesor</option>
              {/* Agrega opciones de asesor aquí */}
            </select>
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Campaña</span>
            <select
              name="campania"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={campania}
              onChange={handledForm}
            >
              <option value="">Selecciona una campaña</option>
              {}
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
          onChange={handledForm}
        ></textarea>
      </label>
      <label className="block flex flex-col gap-y-1 mt-6">
        <span className="block text-sm font-medium">Mensaje marketing</span>
        <textarea
          name="mensajeMarketing"
          rows="3"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Mensaje marketing"
          value={mensajeMarketing}
          onChange={handledForm}
        ></textarea>
      </label>

      <div className="mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
          type="submit"
          onClick={handledForm}
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