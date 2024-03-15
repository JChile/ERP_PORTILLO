import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getCampania, updateCampania } from "../helpers";
import { MenuItem, Select, TextField } from "@mui/material";
import { useAlertMUI } from "../../../hooks";
import {
  CustomAlert,
  CustomCircularProgress,
  FilterSubcategoria,
  FilterProyectos,
  CustomDatePicker,
} from "../../../components";
import { AuthContext } from "../../../auth";
import {
  combinarErrores,
  obtenerHoraActualFormatPostgress,
} from "../../../utils";

export const UpdateCampania = () => {
  const { idCampania } = useParams();
  const { authTokens, currentUser } = useContext(AuthContext);

  const [flagLoading, setFlagLoading] = useState(false);

  const [campaign, setCampaign] = useState({
    nombre: "",
    fecha_estimada: "",
    fecha_cierre: "",
    descripcion: "",
    estado: "",
    proyecto: null,
    categoria: null,
  });

  const {
    nombre,
    fecha_estimada,
    fecha_cierre,
    descripcion,
    estado,
    proyecto,
    categoria,
  } = campaign;

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const [visibleProgress, setVisibleProgress] = useState(false);

  const onAddCategory = (category) => {
    setCampaign({
      ...campaign,
      subCategoria: category.id,
    });
  };

  const onAddProject = (project) => {
    setCampaign({
      ...campaign,
      proyecto: project.id,
    });
  };

  const handledForm = (event) => {
    const { name, value } = event.target;
    setCampaign({
      ...campaign,
      [name]: value,
    });
  };

  // fecha inicio estimado
  const handleFechaInicioEstimado = (newDate) => {
    setCampaign({
      ...campaign,
      fecha_estimada: newDate,
    });
  };

  // fecha cierre estimado
  const handleFechaCierreEstimado = (newDate) => {
    setCampaign({
      ...campaign,
      fecha_cierre: newDate,
    });
  };

  const validateCampaign = (
    nombre,
    fecha_estimada,
    fecha_cierre,
    estado,
    proyecto,
    categoria
  ) => {
    const errors = [];

    if (!nombre) {
      errors.push("- El nombre de la campaña es obligatorio.");
    }
    if (!fecha_estimada) {
      errors.push("- La fecha estimada es obligatoria.");
    }
    if (!fecha_cierre) {
      errors.push("- La fecha de cierre es obligatoria.");
    }
    if (!estado) {
      errors.push("- El estado es obligatorio.");
    }
    if (!proyecto) {
      errors.push("- El proyecto es obligatorio.");
    }
    if (!categoria) {
      errors.push("- La subcategoría es obligatoria.");
    }

    return errors.join("\n");
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const actualizarCampania = async () => {
    const validationMessage = validateCampaign(
      nombre,
      fecha_estimada,
      fecha_cierre,
      estado,
      proyecto,
      categoria
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
        const formatData = {
          ...campaign,
          usuarioActualizador: currentUser["user_id"],
          fecha_actualizacion: obtenerHoraActualFormatPostgress(),
        };
        const result = await updateCampania(
          idCampania,
          formatData,
          authTokens["access"]
        );
        setVisibleProgress(false);
        onNavigateBack();
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
    }
  };

  const obtenerCampania = async (idCampania) => {
    setVisibleProgress(true);
    try {
      const result = await getCampania(idCampania, authTokens["access"]);
      console.log(result);
      setCampaign({
        ...result,
        proyecto: result.proyecto["id"],
        categoria: result.categoria["id"],
        descripcion: result.descripcion === null ? "" : result.descripcion,
      });
      setVisibleProgress(false);
      setFlagLoading(true);
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

  useEffect(() => {
    obtenerCampania(idCampania);
  }, []);

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5">
        <h1 className="text-lg font-bold">Actualizar campaña</h1>
        <hr className="my-4"></hr>
        {flagLoading && (
          <form
            method="post"
            className="min-w-[242px] flex flex-col gap-y-6 gap-x-8"
          >
            <div className="flex flex-row gap-y-6 gap-x-8">
              <div className="w-6/12 flex flex-col gap-y-5">
                <label className="flex flex-col gap-y-1 ">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Nombre de la campaña
                  </span>
                  <input
                    type="text"
                    name="nombre"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Nombre de la campaña"
                    value={nombre}
                    onChange={handledForm}
                  />
                </label>

                <label
                  htmlFor="fecha_estimada"
                  className="flex flex-col gap-y-1"
                >
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Fecha estimado
                  </span>
                  <CustomDatePicker
                    onNewFecha={handleFechaInicioEstimado}
                    defaultValue={fecha_estimada}
                  />
                </label>

                <label className="flex flex-col gap-y-1">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Proyecto
                  </span>
                  <FilterProyectos
                    defaultValue={proyecto}
                    onNewInput={onAddProject}
                  />
                </label>
              </div>

              <div className="w-6/12 flex flex-col gap-y-5">
                <label className="flex flex-col gap-y-1">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Estado inicial
                  </span>
                  <Select
                    name="estado"
                    value={estado}
                    onChange={handledForm}
                    style={{
                      height: "2.64rem", // Ajusta el valor según tus necesidades
                      paddingTop: "1rem", // Ajusta el valor según tus necesidades
                      paddingBottom: "1rem",
                    }}
                    className="bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  >
                    <MenuItem value="A">Activo</MenuItem>
                    <MenuItem value="I">Inactivo</MenuItem>
                  </Select>
                </label>

                <label className="flex flex-col gap-y-1">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Fecha estimado cierre
                  </span>
                  <CustomDatePicker
                    defaultValue={fecha_cierre}
                    onNewFecha={handleFechaCierreEstimado}
                    disabledPast={true}
                  />
                </label>

                <label className="flex flex-col gap-y-1">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Subcategoria
                  </span>
                  <FilterSubcategoria
                    defaultValue={categoria}
                    onNewInput={onAddCategory}
                  />
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="descripcion"
                className="flex flex-col gap-y-1"
              >
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Descripción
                </span>
                <TextField
                  name="descripcion"
                  onChange={handledForm}
                  id="descripcion"
                  value={descripcion}
                  multiline
                  rows={2}
                  inputProps={{
                    style: {
                      width: "100%",
                      overflowWrap: "break-word",
                    },
                  }}
                />
              </label>
            </div>
          </form>
        )}
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={actualizarCampania}
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
