import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducto, updateProducto } from "../helpers";
import { useAlertMUI } from "../../../hooks";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { FilterProyectos } from "../../../components";
import { FilterTipoProducto } from "../../../components";
import { combinarErrores, validIdURL } from "../../../utils";
import { AuthContext } from "../../../auth";

export const UpdateProducto = () => {
  const { authTokens } = useContext(AuthContext);
  const { idProduct } = useParams();
  const numericId = parseInt(idProduct);
  console.log({ idProduct });
  const [product, setProduct] = useState({
    nombre: "",
    numero: 0.0,
    area: 0.0,
    tipo: null,
    proyecto: null,
    estado: "A",
  });

  const { nombre, numero, area, tipo, proyecto, estado } = product;

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const [visibleProgress, setVisibleProgress] = useState(false);

  const obtenerProducto = async () => {
    if (validIdURL(numericId)) {
      try {
        const result = await getProducto(idProduct, authTokens["access"]);
        setProduct({
          ...result,
          tipo: result.tipo.id,
          proyecto: result.proyecto.id,
        });
      } catch (error) {
        setVisibleProgress(false);
        const pilaError = combinarErrores(error);
        // mostramos feedback de error
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: pilaError,
        });
        handleClickFeedback();
      }
    } else {
      //onNavigateBack();
    }
  };

  const handledForm = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const onAddTipoProducto = (item) => {
    setProduct({ ...product, tipo: item.id });
  };
  const onAddProyecto = (item) => {
    setProduct({ ...product, proyecto: item.id });
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const validateProduct = (nombre, numero, area, tipo, proyecto) => {
    const errors = [];

    if (!nombre) {
      errors.push("- El nombre del proyecto es obligatorio.");
    }
    if (!numero) {
      errors.push("- El número es obligatorio.");
    }
    if (!area) {
      errors.push("- El área es obligatorio.");
    }
    if (!tipo) {
      errors.push("- El tipo es obligatorio.");
    }
    if (!proyecto) {
      errors.push("- El proyecto es obligatorio.");
    }
    return errors.join("\n");
  };

  const actualizarProducto = async () => {
    const validationMessage = validateProduct(
      nombre,
      numero,
      area,
      tipo,
      proyecto
    );

    if (validationMessage) {
      // Si hay campos faltantes, mostrar una alerta con los mensajes de error concatenados
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: validationMessage,
      });
      handleClickFeedback();
    } else {
      setVisibleProgress(true);
      try {
        const result = await updateProducto(
          idProduct,
          product,
          authTokens["access"]
        );
        setVisibleProgress(false);
        onNavigateBack();
      } catch (error) {
        setVisibleProgress(false);
        const pilaError = combinarErrores(error);
        // mostramos feedback de error
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: pilaError,
        });
        handleClickFeedback();
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    obtenerProducto();
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="relative p-5">
        <h1 className="text-lg font-bold">Crear Proyecto</h1>
        <hr className="my-4"></hr>
        <form
          method="post"
          className="min-w-[242px] flex flex-col gap-y-6 gap-x-8"
        >
          <div className="flex flex-row gap-y-6 gap-x-8">
            <div className="w-6/12 flex flex-col gap-y-5">
              <label className="flex flex-col gap-y-1 ">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Nombre del producto
                </span>
                <input
                  type="text"
                  name="nombre"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Nombre del proyecto"
                  autoComplete="off"
                  value={nombre}
                  onChange={handledForm}
                />
              </label>

              <label htmlFor="numero" className="flex flex-col gap-y-1">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Numero
                </span>
                <input
                  type="number"
                  name="numero"
                  id="numero"
                  placeholder="numero"
                  value={numero}
                  onChange={handledForm}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </label>

              <label htmlFor="area" className="flex flex-col gap-y-1">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Area
                </span>
                <input
                  type="area"
                  name="area"
                  id="area"
                  placeholder="area"
                  value={area}
                  onChange={handledForm}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </label>
            </div>

            <div className="w-6/12 flex flex-col gap-y-5">
              <label className="flex flex-col gap-y-1">
                <span className="block text-sm font-medium">
                  Tipo de Producto
                </span>
                <FilterTipoProducto
                  onNewInput={onAddTipoProducto}
                  defaultValue={tipo}
                />
              </label>

              <label className="flex flex-col gap-y-1">
                <span className="block text-sm font-medium">Proyecto</span>
                <FilterProyectos
                  onNewInput={onAddProyecto}
                  defaultValue={proyecto}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={actualizarProducto}
        >
          Guardar
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          onClick={onNavigateBack}
        >
          Cancelar
        </button>
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
