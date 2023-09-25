import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getLead, updateLead } from "../helpers";
import { Checkbox } from "@mui/material";
import { useAlertMUI } from "../../../hooks";
import {
  CustomAlert,
  CustomCircularProgress,
  FilterCampania,
} from "../../../components";
import { FilterEstadoLead } from "../../../components/filters/estado/FilterEstadoLead";
import { FilterObjecion } from "../../../components/filters/objecion/FilterObjecion";
import { FilterAsesor } from "../../../components/filters/asesor/FilterAsesor";
import { AuthContext } from "../../../auth";

export const UpdateLead = () => {
  const { idLead } = useParams();
  const { authTokens } = useContext(AuthContext);
  /* obtenemos los datos de la sesión para enviarlo. */
  const [currentUser, setCurrentUser] = useState(() =>
    jwtDecode(authTokens.refresh)
  );

  const [lead, setLead] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    comentario: "",
    horaEntrega: "",
    mensajeMarketing: "",
    llamar: true,
    estado: 5,
    objeciones: 1,
    asesor: {
      user:{
        username:"",
      }
    },
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

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const [visibleProgress, setVisibleProgress] = useState(false);

  const obtenerLead = async (idLead) => {
    const result = await getLead(idLead);

    setLead(result);
  };

  const onAddCheckInput = (event) => {
    setLead({ ...lead, llamar: !llamar });
  };
  const onAddCampania = (item) => {
    setLead({ ...lead, campania: item.id })
  }
  const onAddEstadoLead = (item) => {
    setLead({ ...lead, estado: item.id })
  }
  const onAddAsesor = (item) => {
    setLead({ ...lead, asesor: item.id })
  }
  const onAddObjecion = (item) => {
    setLead({ ...lead, objeciones: item.id })
  }

  const validateLead = (
    nombre,
    apellido,
    celular,
    horaEntrega,
    estado,
    objeciones,
    asesor,
    campania,
  ) => {
    const errors = [];

    if (!nombre) {
      errors.push("- El nombre es obligatorio.");
    }
    if (!apellido) {
      errors.push("- El apellido es obligatorio.");
    }
    if (!celular) {
      errors.push("- El celular es obligatorio.");
    }
    if (!horaEntrega) {
      errors.push("- LA hora de entrega es obligatoria.");
    }
    if (!estado) {
      errors.push("- El estado es obligatorio.");
    }
    if (!objeciones) {
      errors.push("- La objecion es obligatoria.");
    }
    if (!asesor) {
      errors.push("- El asesor es obligatorio.");
    }
    if (!campania) {
      errors.push("- La campaña es obligatoria.");
    }
    return errors.join("\n");
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const actualizarLead = async () => {
    const validationMessage = validateLead(
      nombre,
      apellido,
      celular,
      comentario,
      horaEntrega,
      mensajeMarketing,
      llamar,
      asesor,
      campania,
      estado,
      objeciones,
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
      const result = await updateLead(idLead, lead);
      setVisibleProgress(false);
      onNavigateBack();
    }
  };

  const handledForm = (event) => {
    const { name, value } = event.target;
    setLead({
      ...lead,
      [name]: value,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    obtenerLead(idLead);
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5">
        <h1 className="text-lg font-bold">Actualizar Lead</h1>
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
                type="date"
                name="horaEntrega"
                id="hora_entrega"
                value={horaEntrega}
                onChange={handledForm}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
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
              <FilterEstadoLead
                defaultValue={estado.id}
                onNewInput={onAddEstadoLead}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Objeciones</span>
              <FilterObjecion
                defaultValue={objeciones.id}
                onNewInput={onAddObjecion}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Asesor Asignado</span>
              <FilterAsesor
                defaultValue={asesor.id}
                onNewInput={onAddAsesor}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Campaña</span>
              <FilterCampania
                defaultValue={campania.id}
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
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={actualizarLead}
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
