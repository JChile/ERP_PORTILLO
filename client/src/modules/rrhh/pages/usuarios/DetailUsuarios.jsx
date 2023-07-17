import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsuarioPerfil } from "./helpers/getUsuarioPerfil";

export const DetailUsuarios = () => {
  const { idUsuario } = useParams();
  const [usuario, setUsuario] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    groups: [],
  });

  const { username, first_name, last_name, email, groups } = usuario;

  // ESTADOS PARA LA NAVEGACION
  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const obtenerUsuarioPerfil = async () => {
    const result = await getUsuarioPerfil(idUsuario);
    setUsuario(result);
  };

  useEffect(() => {
    obtenerUsuarioPerfil();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="p-3 border-[1px] flex items-center gap-x-5">
          <div
            style={{
              background: "black",
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "22px",
            }}
          >
            {`${first_name[0]}${last_name[0]}`}
          </div>

          <h1 className="text-2xl">
            {first_name} {last_name}
          </h1>
        </div>

        <div className="p-3 border-[1px] flex flex-col gap-y-4">
          <h2 className="text-xl">Login y rol de usuario</h2>
          <hr />

          <div className="flex flex-col md:flex-row min-w-[242px] gap-x-2 gap-y-3">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 min-w-full">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Nombre usuario
                </span>
                <span className="block text-sm">{username}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Nombre
                </span>
                <span className="block text-sm">{first_name}</span>
              </label>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Email trabajo
                </span>
                <span className="block text-sm">{email}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Apellido
                </span>
                <span className="block text-sm">{last_name}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Rol
                </span>
                <span className="block text-sm">{groups[0]}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          onClick={onNavigateBack}
        >
          Volver
        </button>
      </div>
    </>
  );
};
