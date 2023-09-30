import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAsesorById, updateAsesor } from "../helpers";
import { useAlertMUI } from "../../../hooks";
import {
  CustomAlert,
  CustomCircularProgress,
  FilterEstadoRegistro,
  FilterUsuario,
} from "../../../components";

export const UpdateAsesor = () => {
  const { idAsesor } = useParams();
  const numericId = parseInt(idAsesor);

  const [asesor, setAsesor] = useState({
    id: 0,
    user: 0,
    codigo: "",
    maximoLeads: 0,
    estado: "",
  });

  const { id, user, codigo, maximoLeads, estado } = asesor;

  const handledForm = (event) => {
    const { name, value } = event.target;
    setAsesor({
      ...asesor,
      [name]: value,
    });
  };

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const [visibleProgress, setVisibleProgress] = useState(false);

  // ESTADOS PARA LA NAVEGACION
  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const onAdduser = ({ id }) => {
    setAsesor({
      ...asesor,
      user: id,
    });
  };

  const onAddEstado = ({ id }) => {
    setAsesor({
      ...asesor,
      estado: id,
    });
  };

  const validarDatosAsesor = (user, maximoLeads, estado, codigo) => {
    var messages_error = "";
    if (codigo.length === 0) {
      messages_error += "No se proporciono un codigo de asesor\n";
    }
    if (user === 0) {
      messages_error += "No se proporciono un usuario\n";
    }
    if (estado === 0) {
      messages_error += "No se proporciono un estado de registro\n";
    }
    if (maximoLeads === 0) {
      messages_error +=
        "El asesor debe al menos manejar un lead o ingresa -1 para que no tenga limite\n";
    }
    return messages_error;
  };

  const traerDataAsesor = async () => {
    // verificamos si el id pasado por parametro es numerico
    if (!isNaN(numericId) && Number.isInteger(numericId)) {
      setVisibleProgress(true);
      try {
        const resultDetalleAsesor = await getAsesorById(idAsesor);
        setAsesor({
          ...resultDetalleAsesor,
          user: resultDetalleAsesor.user.id,
        });
      } catch (error) {
        console.error("Ocurrio un error:", error.message);
      }
      setVisibleProgress(false);
    } else {
      console.log("INVALIDO ID ASESOR");
    }
  };

  const actualizarLead = async () => {
    const validate = validarDatosAsesor(user, maximoLeads, estado, codigo);
    if (validate.length === 0) {
      setVisibleProgress(true);
      console.log(asesor);
      const result = await updateAsesor(idAsesor, asesor);
      setVisibleProgress(false);
      // navegamos atras
      onNavigateBack();
    } else {
      // mostramos feedback
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: validate,
      });
      handleClickFeedback();
    }
  };

  useEffect(() => {
    traerDataAsesor();
  }, []);

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5 flex justify-between items-center">
        <h1 className="text-2xl my-1">Actualizar asesor</h1>
        <div className="flex justify-center mt-4">
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
              <FilterUsuario onNewInput={onAdduser} defaultValue={user} />
            </label>
            <label className="block flex flex-col gap-y-1 ">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Numero de leads
              </span>
              <input
                type="number"
                name="maximoLeads"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                value={maximoLeads}
                onChange={handledForm}
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
              <FilterEstadoRegistro
                onNewInput={onAddEstado}
                defaultValue={estado}
              />
            </label>
          </div>
        </div>
      </form>
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
