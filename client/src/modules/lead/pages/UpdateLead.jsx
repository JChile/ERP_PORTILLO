import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getLead, updateLead } from "../helpers";
import { Checkbox } from "@mui/material";
import { useAlertMUI } from "../../../hooks";
import {
  CustomAlert,
  CustomCircularProgress,
  FilterEstadoLead,
} from "../../../components";
import { FilterObjecion } from "../../../components/filters/objecion/FilterObjecion";
import { FilterAsesor } from "../../../components/filters/asesor/FilterAsesor";
import { AuthContext } from "../../../auth";
import { MuiTelInput } from "mui-tel-input";
import {
  combinarErrores,
  formatCelular,
  obtenerHoraActualFormatPostgress,
  validIdURL,
} from "../../../utils";
import { FilterProyectoCampania } from "../../../components/multiple-filters/proyecto-campania/FilterProyectoCampania";

export const UpdateLead = () => {
  const { idLead } = useParams();
  const numericId = parseInt(idLead);
  const { authTokens, currentUser } = useContext(AuthContext);

  const [lead, setLead] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    celular2: "",
    comentario: "",
    llamar: true,
    asesor: null,
    estadoLead: null,
    objecion: null,
    campania: null,
    campaniaName: "",
  });

  const {
    nombre,
    apellido,
    celular,
    celular2,
    comentario,
    llamar,
    asesor,
    estadoLead,
    objecion,
    campania,
    campaniaName,
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
    if (validIdURL(numericId)) {
      try {
        setVisibleProgress(true);
        const result = await getLead(idLead, authTokens["access"]);
        setLead({
          ...result,
          asesor: result.asesor ? result.asesor["id"] : null,
          campania: result.campania ? result.campania["id"] : null,
          campaniaName: result.campania ? result.campania["nombre"] : "",
          objecion: result.objecion ? result.objecion["id"] : null,
          estadoLead: result.estadoLead ? result.estadoLead : null,
        });
        // comprobar si se realizo con exito la creación del usuario
        setVisibleProgress(false);
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
      onNavigateBack();
    }
  };
  // change check llamada
  const onAddCheckInputLlamar = (event) => {
    setLead({ ...lead, llamar: !llamar });
  };

  // change campaña
  const onAddCampania = (item) => {
    const label = item["id"] ? item["label"] : "";
    setLead({ ...lead, campania: item.id, campaniaName: label });
  };

  // change estado lead
  const onAddEstadoLead = (item) => {
    setLead({ ...lead, estadoLead: item.id });
  };

  // change asesor
  const onAddAsesor = (item) => {
    setLead({ ...lead, asesor: item.id });
  };

  // change objecion
  const onAddObjecion = (item) => {
    setLead({ ...lead, objecion: item.id });
  };

  const validateLead = () => {
    const errors = [];

    // validacion de celular
    if (celular.length !== 0 && celular !== "+51") {
      const formatCelular = celular.match(/^\+(\d{1,2})\s*(\d[\s\d]+)$/);
      if (formatCelular) {
        const replaceCelular = formatCelular[2].replace(/\s/g, "");
        if (!/^9\d{8}$/.test(replaceCelular)) {
          errors.push("El celular no cumple con el formato adecuado");
        }
      } else {
        if (!/^9\d{8}$/.test(celular)) {
          errors.push("El celular no cumple con el formato adecuado");
        }
      }
    } else {
      errors.push("El celular es obligatorio");
    }

    // validacion de celular 2
    if (celular2.length !== 0 && celular2 !== "+51") {
      const formatCelular2 = celular2.match(/^\+(\d{1,2})\s*(\d[\s\d]+)$/);
      if (formatCelular2) {
        const replaceCelular2 = formatCelular2[2].replace(/\s/g, "");
        if (!/^9\d{8}$/.test(replaceCelular2)) {
          errors.push("El celular 2 no cumple con el formato adecuado");
        }
      } else {
        if (!/^9\d{8}$/.test(celular2)) {
          errors.push("El celular no cumple con el formato adecuado");
        }
      }
    }

    // validacion de campaña
    if (!campania) {
      errors.push("Debes seleccionar una campaña");
    }

    // validacion de estado de lead
    if (!estadoLead) {
      errors.push("Debes seleccionar un estado de lead");
    }

    // validacion de objecion
    if (!objecion) {
      errors.push("Debes seleccionar una objecion");
    }

    return errors.join("\n");
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const actualizarLead = async () => {
    // activamos el progress
    setVisibleProgress(true);

    const validationMessage = validateLead();
    if (validationMessage) {
      setVisibleProgress(false);
      // Si hay campos faltantes, mostrar una alerta con los mensajes de error concatenados
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: validationMessage,
      });
      handleClickFeedback();
    } else {
      try {
        const formatLead = {
          ...lead,
          celular: /^9\d{8}$/.test(lead["celular"])
            ? lead["celular"]
            : formatCelular(lead["celular"]),
          celular2:
            celular2.length !== 0 && celular2 !== "+51"
              ? /^9\d{8}$/.test(lead["celular2"])
                ? lead["celular2"]
                : formatCelular(lead["celular2"])
              : "",
          usuarioActualizador: currentUser["user_id"],
          fecha_actualizacion: obtenerHoraActualFormatPostgress(),
        };

        console.log(formatLead);
        const result = await updateLead(
          idLead,
          formatLead,
          authTokens["access"]
        );
        setVisibleProgress(false);
        onNavigateBack();
      } catch (error) {
        console.log(error);
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

  const handledForm = (event) => {
    const { name, value } = event.target;
    setLead({
      ...lead,
      [name]: value,
    });
  };

  useEffect(() => {
    obtenerLead(idLead);
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
              <MuiTelInput
                defaultCountry="PE"
                disableDropdown
                forceCallingCode
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
                disableDropdown
                forceCallingCode
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
              {estadoLead && (
                <FilterEstadoLead
                  defaultValue={estadoLead}
                  onNewInput={onAddEstadoLead}
                />
              )}
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Objeciones</span>
              {objecion && (
                <FilterObjecion
                  defaultValue={objecion}
                  onNewInput={onAddObjecion}
                />
              )}
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Asesor Asignado</span>
              {asesor && (
                <FilterAsesor defaultValue={asesor} onNewInput={onAddAsesor} />
              )}
            </label>

            <label className="flex content-center gap-x-2">
              <span className="block text-sm font-medium flex items-center">
                <span className="mr-2">Campaña: </span>
                {campaniaName.length !== 0 && (
                  <span className="inline-block px-2 py-1 text-sm font-semibold leading-none bg-blue-500 text-white rounded-full">
                    {campaniaName}
                  </span>
                )}
              </span>
              <FilterProyectoCampania onAddCampania={onAddCampania} />
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
