import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducto } from "../helpers";
import { combinarErrores, validIdURL } from "../../../utils";
import { CustomAlert } from "../../../components";
import { AuthContext } from "../../../auth";
import { useAlertMUI } from "../../../hooks";
import CarouselComponentImageView from "../components/CarrouselImageView";
import CarouselComponentVideoView from "../components/CarouselVideoView";


export const DetailProducto = () => {
  const { authTokens } = useContext(AuthContext);
  const { idProducto } = useParams();
  const numericId = parseInt(idProducto);
  const [producto, setProducto] = useState({
    nombre: "",
    codigo: "",
    numero: 0,
    area: 0,
    tipo: {
      nombre: "",
    },
    proyecto: {
      nombre: "",
    },
    estado: "",
    imagenes: [],
    videos: [],
  });

  const { nombre, codigo, numero, area, tipo, proyecto, estado, imagenes, videos } = producto;

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const obtenerProducto = async () => {
    if (validIdURL(numericId)) {
      try {
        const auxProducto = await getProducto(idProducto, authTokens["access"]);
        setProducto(auxProducto);
      } catch (error) {
        const pilaError = combinarErrores(error);
        // mostramos feedback de error
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: pilaError,
        });
        handleClickFeedback();
      }
    } else {
      onNavigateBack();
    }
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const controller = new AbortController();
    obtenerProducto(idProducto);
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="p-3 border-[1px] flex flex-col gap-x-5">
          <h1 className="text-lg font-bold">Productos</h1>
          <h3 className="text-sm">Producto: {nombre}</h3>
        </div>
        <div className="p-3 border-[1px] flex flex-col gap-y-4">
          <div className="flex flex-col md:flex-row min-w-[242px] gap-x-2 gap-y-3">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 min-w-full">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Codigo:
                </span>
                <span className="block text-sm">{codigo || "-"}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Numero:
                </span>
                <span className="block text-sm">{numero || "-"}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Area:
                </span>
                <span className="block text-sm">{area || "-"}m2</span>
              </label>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Tipo:
                </span>
                <span className="block text-sm">{tipo.nombre || "-"}</span>
              </label>
              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Proyecto:
                </span>
                <span className="block text-sm">{proyecto.nombre || "-"}</span>
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
          <div className="flex flex-row gap-y-6 gap-x-8">
            <div className="w-6/12 flex flex-col gap-y-5 border border-gray-300 p-4 rounded-md">
              <h3>Imagenes</h3>
              <div className="items-center mx-auto">
                <CarouselComponentImageView images={imagenes}/>
              </div>
            </div>

            <div className="w-6/12 flex flex-col gap-y-5 border border-gray-300 p-4 rounded-md">
              <h3>Videos</h3>
              <div className="items-center mx-auto">
                <CarouselComponentVideoView videos={videos}/>
              </div>
            </div>
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
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
    </>
  );
};
