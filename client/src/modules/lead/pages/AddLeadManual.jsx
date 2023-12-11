import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createLead } from "../helpers";
import {
  CustomAlert,
  FilterCampania,
  CustomCircularProgress,
} from "../../../components";
import { FilterEstadoLead } from "../../../components/filters/estado/FilterEstadoLead";
import { FilterObjecion } from "../../../components/filters/objecion/FilterObjecion";
import { FilterAsesor } from "../../../components/filters/asesor/FilterAsesor";
import { useAlertMUI } from "../../../hooks";
import { MuiTelInput } from "mui-tel-input";

export const AddLeadManual = () => {
  const [lead, setLead] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    celular2: "",
    telefono: "",
    comentario: "",
    llamar: true,
    asesor: null,
    estado: "A",
    estadoLead: "EP",
    objecion: 1,
    campania: null,
    horaRecepcion: "",
  });

  const {
    nombre,
    apellido,
    celular,
    celular2,
    comentario,
    llamar,
    asesor,
    estado,
    estadoLead,
    objecion,
    horaRecepcion,
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

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const handledForm = ({ target }) => {
    const { name, value } = target;
    setLead({ ...lead, [name]: value });
  };

  const onAddCheckInputLlamar = (event) => {
    setLead({ ...lead, llamar: !llamar });
  };
  const onAddCampania = (item) => {
    setLead({ ...lead, campania: item.id });
  };
  const onAddEstadoLead = (item) => {
    setLead({ ...lead, estadoLead: item.id });
  };
  const onAddAsesor = (item) => {
    setLead({ ...lead, asesor: item.id });
  };
  const onAddObjecion = (item) => {
    setLead({ ...lead, objecion: item.id });
  };

  const validateLead = (celular) => {
    const errors = [];
    if (celular.length === 0) {
      errors.push("El celular es obligatorio.");
    }
    return errors.join("\n");
  };

  const crearLead = async () => {
    const validationMessage = validateLead(celular);
    if (validationMessage) {
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: validationMessage,
      });
      handleClickFeedback();
    } else {
      setVisibleProgress(true);
      const formatLead = { ...lead };

      if (lead.horaRecepcion.length === 0) {
        delete formatLead.horaRecepcion;
      }
      console.log(formatLead);
      const result = await createLead(formatLead);
      setVisibleProgress(false);
      onNavigateBack();
    }
  };
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
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium flex items-center me-2">
                Celular
              </span>
              <MuiTelInput
                defaultCountry="PE"
                value={celular}
                onChange={(value) => {
                  handledForm({
                    target: {
                      name: "celular",
                      value: value,
                    },
                  });
                }}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Celular 2</span>
              <MuiTelInput
                defaultCountry="PE"
                value={celular2}
                onChange={(value) => {
                  handledForm({
                    target: {
                      name: "celular2",
                      value: value,
                    },
                  });
                }}
              />
            </label>

            <label
              htmlFor="horaRecepcion"
              className="block flex flex-col gap-y-1"
            >
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Fecha recibido
              </span>
              <input
                type="date"
                name="horaRecepcion"
                value={horaRecepcion}
                onChange={handledForm}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />
            </label>

            <label className="block flex flex-row gap-y-1">
              <span className="block text-sm font-medium flex items-center me-2">
                Llamar?
              </span>
              <Checkbox
                name="llamar"
                checked={llamar}
                onChange={onAddCheckInputLlamar}
                inputProps={{ "aria-label": "controlled" }}
              />
            </label>
          </div>

          <div className="flex-1 flex flex-col gap-y-6">
            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Estado Lead</span>
              <FilterEstadoLead
                onNewInput={onAddEstadoLead}
                defaultValue={estadoLead}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Objecion</span>
              <FilterObjecion
                onNewInput={onAddObjecion}
                defaultValue={objecion}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Asesor Asignado</span>
              <FilterAsesor onNewInput={onAddAsesor} />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Campaña</span>
              <FilterCampania onNewInput={onAddCampania} />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Comentario</span>
              <textarea
                name="comentario"
                rows="6"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Comentario"
                value={comentario}
                onChange={handledForm}
              ></textarea>
            </label>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={crearLead}
        >
          Guardar
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
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
