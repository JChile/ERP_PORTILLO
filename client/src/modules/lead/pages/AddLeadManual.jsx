import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { FilterCampania } from "../../../components";

export const AddLeadManual = () => {
  const [lead, setLead] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    comentario: "",
    horaEntrega: "",
    mensajeMarketing: "",
    llamar: false,
    estado: 0,
    objeciones: 0,
    asesor: 0,
    campania: 0,
  });

  const {
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
  } = lead;

  const handleSubmit = (e) => {
    console.log(lead)
  };
  const handledForm = ({target}) =>{
    const {name, value} = target
    setLead ({...lead, [name]:value})
  }
  const onAddCheckInput = (event) => {
    setLead({ ...lead, llamar: !llamar });
  };
  const handleCancelar = (e) => {
    e.preventDefault();
    // ...
  };

  const onAddCampania = (item) =>{
    setLead({...lead, campania: item.id})
  }

  return (
    <>
    <div className="relative border-2 rounded-md border-inherit p-5">
      <h1 className="text-lg font-bold">Añadir lead manualmente</h1>
      <hr className="my-4"></hr>
      <form method="post" className="min-w-[242px] flex gap-x-8">
        <div className="flex-1 flex flex-col gap-y-6">
          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Nombre</span>
            <input
              type="text"
              name="nombre"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Nombre"
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
              placeholder="Apellido"
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
              placeholder="Celular"
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
              placeholder="Hora de Entrega"
              value={horaEntrega}
              onChange={handledForm}
            />
          </label>

          <label className="block flex flex-col gap-y-1">
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

          <label className="block flex flex-row gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium flex items-center me-2">
                Llamar?
              </span>
              <Checkbox
                name="llamar"
                checked={llamar}
                onChange={onAddCheckInput}
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
              <option value="">Selecciona una estado</option>
              {/* Agrega opciones de campaña aquí */}
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
              <option value="">Selecciona una objeciones</option>
              {/* Agrega opciones de campaña aquí */}
            </select>
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Asesor Asignado</span>
            <select
              name="asesor"
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
            <FilterCampania
              onNewInput={onAddCampania}
            />
          </label>
          
          <label className="block flex flex-col gap-y-1">
            <span className="block text-sm font-medium">Mensaje de Marketing</span>
            <textarea
              name="mensajeMarketing"
              rows="3"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Mensaje de Marketing"
              value={mensajeMarketing}
              onChange={handledForm}
            ></textarea>
          </label>
        </div>
      </form>
    </div>
    <div className="flex justify-center mt-4">
    <button
      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
      onClick={handleSubmit}
    >
      Guardar
    </button>
    <button
      className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
      onClick={handleCancelar}
    >
      Cancelar
    </button>
  </div>
  </>
  );
};
