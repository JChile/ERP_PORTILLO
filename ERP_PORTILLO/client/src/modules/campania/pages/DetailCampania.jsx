import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCampania } from "../helpers";
import { AuthContext } from "../../../auth";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { useAlertMUI } from "../../../hooks";
import { combinarErrores } from "../../../utils";

export const DetailCampania = () => {
  const { idCampania } = useParams();
  const { authTokens } = useContext(AuthContext);
  const [campania, setCampania] = useState({
    nombre: "",
    codigo: "",
    fecha_estimada: "",
    fecha_cierre: "",
    coste_estimado: 0,
    coste_real: 0,
    descripcion: "",
    estado: "",
    proyecto: {
      nombre: "",
    },
    categoria: {
      nombre: "",
    },
  });

  const {
    nombre,
    codigo,
    fecha_estimada,
    fecha_cierre,
    coste_estimado,
    coste_real,
    descripcion,
    estado,
    proyecto,
    categoria,
  } = campania;

  // hook alert
  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  // Retroalimentacion, estado de progreso.
  const [visibleProgress, setVisibleProgress] = useState(true);

  const obtenerCamapania = async (idCampania) => {
    setVisibleProgress(true);
    try {
      const auxCampania = await getCampania(idCampania, authTokens["access"]);
      setCampania(auxCampania);
      setVisibleProgress(false);
    } catch (error) {
      // ocultar el progress
      setVisibleProgress(false);
      const pilaError = combinarErrores(error);
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    obtenerCamapania(idCampania);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="p-3 border-[1px] flex flex-col gap-x-5">
          <h1 className="text-lg font-bold">Campaña de Marketing</h1>
          <h3 className="text-sm">Proyecto: {nombre}</h3>
        </div>
        <div className="p-3 border-[1px] flex flex-col gap-y-4">
          <div className="flex flex-col md:flex-row min-w-[242px] gap-x-2 gap-y-3">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 min-w-full">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Campaña:
                </span>
                <span className="block text-sm">{nombre}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Fecha estimada:
                </span>
                <span className="block text-sm">{fecha_estimada}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Coste estimado:
                </span>
                <span className="block text-sm">s./ {coste_estimado}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Categoria:
                </span>
                <span className="block text-sm">{categoria.nombre}</span>
              </label>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Codigo:
                </span>
                <span className="block text-sm">{codigo}</span>
              </label>
              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Proyecto:
                </span>
                <span className="block text-sm">{proyecto.nombre}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Fecha cierre:
                </span>
                <span className="block text-sm">{fecha_cierre}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Coste real:
                </span>
                <span className="block text-sm">s./ {coste_real}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Estado:
                </span>
                <span className="block text-sm">
                  {estado == "A" ? "Activo" : "Inactivo"}
                </span>
              </label>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
              Descripción:
            </span>
            <span className="block text-sm">{descripcion}</span>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              onClick={onNavigateBack}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
      {/* COMPONENTE ALERTA */}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />

      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
