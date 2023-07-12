import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CreateUsuarios = () => {
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    grupo: "",
  });

  const { username, password, grupo } = usuario;
  // handled
  const handledForm = ({ target }) => {
    const { name, value } = target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  // funcion para mostrar valores
  const mostrarValores = (e) => {
    e.preventDefault();
    // validar los campos
    if (username.length === 0 || password.length === 0 || grupo.length === 0) {
      console.log("INVALIDO");
    } else {
      // comunicarse con backend
      console.log(usuario);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="relative border-2 rounded-md border-inherit p-5">
      <h1 className="text-2xl my-1">Login y Rol Usuarios</h1>
      <hr className="my-4"></hr>
      <form method="post" className="min-w-[242px] flex gap-y-6 gap-x-8">
        <div className="w-6/12 flex flex-col gap-y-5">
          <label className="block flex flex-col gap-y-1 ">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
              Nombre Usuario
            </span>
            <input
              type="text"
              name="rolName"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Nombre Usuario"
              id="rolName"
              value={username}
              onChange={handledForm}
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
              Nombre
            </span>
            <input
              type="text"
              name="rolName"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Nombre"
              id="rolName"
              value={password}
              onChange={handledForm}
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
              Contraseña
            </span>
            <input
              type="text"
              name="rolName"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Contraseña"
              id="rolName"
              value={grupo}
              onChange={handledForm}
            />
          </label>
        </div>

        <div className="w-6/12 flex flex-col gap-y-5">

        <label className="block flex flex-col gap-y-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
              Correo Trabajo
            </span>
            <input
              type="text"
              name="rolName"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Contraseña"
              id="rolName"
              value={grupo}
              onChange={handledForm}
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
              Apellido
            </span>
            <input
              type="text"
              name="rolName"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Contraseña"
              id="rolName"
              value={grupo}
              onChange={handledForm}
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
              Confirmar contraseña
            </span>
            <input
              type="text"
              name="rolName"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Contraseña"
              id="rolName"
              value={grupo}
              onChange={handledForm}
            />
          </label>

          <label className="block flex flex-col gap-y-1">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
              Rol
            </span>
            <input
              type="text"
              name="rolName"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Contraseña"
              id="rolName"
              value={grupo}
              onChange={handledForm}
            />
          </label>

        </div>

      </form>

      <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2">
          Crear
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4">
          Cancelar
        </button>
      </div>
    </div>
  );
};
