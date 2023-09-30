import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAsesorById } from "../helpers";
import { CustomCircularProgress } from "../../../components";

export const DetailAsesor = () => {
  const { idAsesor } = useParams();
  const numericId = parseInt(idAsesor);

  const [asesor, setAsesor] = useState({
    id: 0,
    user: 0,
    codigo: "",
    numeroLeads: 0,
    estado: "",
  });

  const { id, user, codigo, numeroLeads, estado } = asesor;

  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  // ESTADOS PARA LA NAVEGACION
  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const traerDataAsesor = async () => {
    // verificamos si el id pasado por parametro es numerico
    if (!isNaN(numericId) && Number.isInteger(numericId)) {
      setVisibleProgress(true);
      try {
        const resultDetalleAsesor = await getAsesorById(idAsesor);
        setAsesor(resultDetalleAsesor);
      } catch (error) {
        console.error("Ocurrio un error:", error.message);
      }
      setVisibleProgress(false);
    } else {
      console.log("INVALIDO ID ASESOR");
    }
  };

  useEffect(() => {
    traerDataAsesor();
  }, []);

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5 flex justify-between items-center">
        <h1 className="text-2xl my-1">Detalle asesor</h1>
        <div className="flex justify-center mt-4">
          <Link
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
            to={`/asesor/update/${idAsesor}`}
          >
            Editar
          </Link>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={onNavigateBack}
          >
            Volver
          </button>
        </div>
      </div>
      <hr className="my-4"></hr>
      <form className="min-w-[242px] flex flex-col gap-y-6 gap-x-8">
        <div className="flex flex-row gap-y-6 gap-x-8">
          <div className="w-6/12 flex flex-col gap-y-5">
            <label className="block flex flex-col gap-y-1 ">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Usuario
              </span>
              <input
                type="text"
                name="user"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                value={`${user.first_name} ${user.last_name} - ${user.username}`}
                readOnly
              />
            </label>
            <label className="block flex flex-col gap-y-1 ">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Numero de leads
              </span>
              <input
                type="number"
                name="numeroLeads"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                value={numeroLeads}
                readOnly
              />
            </label>
          </div>
          <div className="w-6/12 flex flex-col gap-y-5">
            <label className="block flex flex-col gap-y-1 ">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Codigo asesor
              </span>
              <input
                type="text"
                name="codigo"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                value={codigo}
                readOnly
              />
            </label>
            <label className="block flex flex-col gap-y-1 ">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Estado registro
              </span>
              <input
                type="text"
                name="estado"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                value={estado === "A" ? "Activo" : "Inactivo"}
                readOnly
              />
            </label>
          </div>
        </div>
      </form>
      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
