import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, TextField } from "@mui/material";
import { createCampania } from "../helpers";
import { useAlertMUI } from "../../../hooks";
import {
  CustomAlert,
  FilterProyectos,
  FilterSubcategoria,
  CustomCircularProgress,
  CustomDatePicker,
} from "../../../components";
import { AuthContext } from "../../../auth";
import { combinarErrores } from "../../../utils";

export const CreateCampania = () => {
  const { authTokens, currentUser } = useContext(AuthContext);
  const [campaign, setCampaign] = useState({
    nombre: "",
    fecha_estimada: "",
    fecha_cierre: "",
    descripcion: "",
    proyecto: 0,
    categoria: 0,
    organico: false
  });

  const {
    nombre,
    fecha_estimada,
    fecha_cierre,
    descripcion,
    proyecto,
    categoria,
    organico
  } = campaign;

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const [visibleProgress, setVisibleProgress] = useState(false);

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  // control de formularios
  const handledForm = (event) => {
    const { name, value } = event.target;
    setCampaign({
      ...campaign,
      [name]: value,
    });
  };

  // categoria
  const onAddCategory = (category) => {
    setCampaign({
      ...campaign,
      categoria: category.id,
    });
  };

  // proyecto
  const onAddProject = (project) => {
    setCampaign({
      ...campaign,
      proyecto: project.id,
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

  // cambiar checkbox organico
  const onAddCheckInputOrganico = ({target}) => {
    const {checked} =  target
    setCampaign({
      ...campaign,
      organico: checked
    })
  }

  const validateCampaign = (
    nombre,
    fecha_estimada,
    fecha_cierre,
    proyecto,
    categoria
  ) => {
    const errors = [];

    //validacion de nombre
    if (nombre.length === 0) {
      errors.push("- El nombre de la campaña es obligatorio.");
    } else if (nombre.length < 10 || nombre.length > 60) {
      errors.push(
        "- El nombre de la campaña debe tener entre 10 y 60 caracteres"
      );
    }

    // validacion de fecha estimada
    if (fecha_estimada.length === 0) {
      errors.push("- La fecha estimada es obligatoria.");
    }

    // validacion de fecha de cierre
    if (fecha_cierre.length === 0) {
      errors.push("- La fecha de cierre es obligatoria.");
    }

    // validacion de proyecto
    if (proyecto === 0) {
      errors.push("- El proyecto es obligatorio.");
    }

    // validacion de categoria
    if (categoria === 0) {
      errors.push("- La categoría es obligatoria.");
    }

    return errors.join("\n");
  };

  const crearCampania = async () => {
    const validationMessage = validateCampaign(
      nombre,
      fecha_estimada,
      fecha_cierre,
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
          usuarioCreador: currentUser["user_id"],
        };
        const result = await createCampania(formatData, authTokens["access"]);
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

  return (
    <>
      <div className="relative p-5">
        <h1 className="text-lg font-bold">Crear Campaña de Marketing</h1>
        <hr className="my-4"></hr>
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
                  minLength={10}
                  maxLength={30}
                  type="text"
                  name="nombre"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Nombre de la campaña"
                  autoComplete="off"
                  value={nombre}
                  onChange={handledForm}
                />
              </label>

              <label htmlFor="fecha_estimada" className="flex flex-col gap-y-1">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Fecha estimado inicio
                </span>
                <CustomDatePicker
                  onNewFecha={handleFechaInicioEstimado}
                  defaultValue={fecha_estimada}
                />
              </label>
              <label className="flex flex-col gap-y-1">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Categoria
                </span>
                <FilterSubcategoria
                  defaultValue={null}
                  onNewInput={onAddCategory}
                />
              </label>
            </div>

            <div className="w-6/12 flex flex-col gap-y-5">
              <label className="flex flex-col gap-y-1">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Proyecto
                </span>
                <FilterProyectos
                  defaultValue={null}
                  onNewInput={onAddProject}
                />
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

              <label className="flex flex-row gap-y-1">
              <span className="text-sm font-medium flex items-center me-2">
                Orgánico
              </span>
              <Checkbox
                name="organico"
                checked={organico}
                onChange={onAddCheckInputOrganico}
                inputProps={{ "aria-label": "controlled" }}
              />
            </label>


            </div>
          </div>
          <div>
            <label htmlFor="descripcion" className=" flex flex-col gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Descripción
              </span>
              <TextField
                name="descripcion"
                onChange={handledForm}
                id="descripcion"
                value={descripcion}
                multiline
                maxLength={200}
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
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={crearCampania}
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
