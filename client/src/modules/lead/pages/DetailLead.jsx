import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createLlamada,
  createWhatsapp,
  getLead,
  updateWhatsapp,
  updateLlamada,
} from "../helpers";
import { Button, Checkbox } from "@mui/material";
import { DialogForm } from "../../ventas/components/DialogForm";
import { ComponentLlamadas, ComponentWhatsapp } from "../components";
import { AuthContext } from "../../../auth";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { useAlertMUI } from "../../../hooks";
import { combinarErrores, validIdURL } from "../../../utils";

export const DetailLead = () => {
  const { idLead } = useParams();
  const numericId = parseInt(idLead);
  const { authTokens, currentUser } = useContext(AuthContext);
  const isAsesor = currentUser["groupsId"] === "1" ? true : false;
  const [showDialog, setShowDialog] = useState(false);
  const [lead, setLead] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    telefono: "",
    comentario: "",
    llamar: true,
    asesor: {
      user: {
        username: "",
      },
    },
    estado: "A",
    estadoLead: "EP",
    objecion: {
      nombre: "",
    },
    campania: {
      nombre: "",
    },
    llamadas: [],
    whatsapps: [],
    eventos: [],
  });

  const {
    nombre,
    apellido,
    celular,
    telefono,
    comentario,
    llamar,
    asesor,
    estado,
    estadoLead,
    objecion,
    campania,
    llamadas,
    whatsapps,
    eventos,
  } = lead;

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  };

  const [visibleProgress, setVisibleProgress] = useState(false);

  // obtener informacion del lead
  const obtenerLead = async () => {
    if (validIdURL(numericId)) {
      try {
        setVisibleProgress(true);
        const auxLead = await getLead(numericId, authTokens.access);
        setLead(auxLead);
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

  // crear informacion de whatsapp
  const createWhatsappMessage = async (itemData) => {
    try {
      const result = await createWhatsapp(itemData, authTokens["access"]);
      const createDataWhatsapp = [...whatsapps, result];
      setLead({
        ...lead,
        whatsapps: createDataWhatsapp,
      });
    } catch (error) {
      const pilaError = combinarErrores(error);
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
  };

  // actualizar informacion de whatsapp
  const updateWhatsappMessage = async (id, itemData) => {
    try {
      const result = await updateWhatsapp(id, itemData, authTokens["access"]);
      const updateDataWhatsapp = whatsapps.map((element) => {
        if (element.id === id) {
          return result;
        } else {
          return element;
        }
      });
      setLead({
        ...lead,
        whatsapps: updateDataWhatsapp,
      });
    } catch (error) {
      const pilaError = combinarErrores(error);
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
  };

  // crear informacion de llamada
  const createLlamadaLead = async (itemData) => {
    try {
      const result = await createLlamada(itemData, authTokens["access"]);
      const createDataLlamada = [...llamadas, result];
      setLead({
        ...lead,
        llamadas: createDataLlamada,
      });
    } catch (error) {
      const pilaError = combinarErrores(error);
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
  };

  // actualizar informacion de whatsapp
  const updateLlamadaLead = async (id, itemData) => {
    try {
      const result = await updateLlamada(id, itemData, authTokens["access"]);
      const updateDataLlamada = llamadas.map((element) => {
        if (element.id === id) {
          return result;
        } else {
          return element;
        }
      });
      console.log(updateDataLlamada);
      setLead({
        ...lead,
        llamadas: updateDataLlamada,
      });
    } catch (error) {
      const pilaError = combinarErrores(error);
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
  };

  useEffect(() => {
    obtenerLead();
  }, []);

  return (
    <>
      {showDialog ? (
        <DialogForm
          lead={idLead}
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          token={authTokens.access}
          user={currentUser.user_id}
        />
      ) : null}

      <div className="flex flex-col gap-y-4">
        <div className="p-3 border-[1px] flex flex-col gap-x-5">
          <h1 className="text-lg font-bold">Detalle Lead</h1>
        </div>
        <div className="p-3 border-[1px] flex flex-col gap-y-4">
          <div className="flex flex-col md:flex-row min-w-[242px] gap-x-2 gap-y-3">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 min-w-full">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Nombre:
                </span>
                <span className="block text-sm">{nombre || ""}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Apellido:
                </span>
                <span className="block text-sm">{apellido || ""}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Celular:
                </span>
                <span className="block text-sm">{celular || ""}</span>
              </label>

              <div className="w-full flex flex-col gap-y-1">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Celular2:
                </span>
                <span className="block text-sm">{telefono || ""}</span>
              </div>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Llamar:
                </span>
                <Checkbox
                  name="llamar"
                  checked={llamar}
                  disabled={true}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </label>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Estado:
                </span>
                <span className="block text-sm">{estadoLead || ""}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Objeciones:
                </span>
                <span className="block text-sm">{objecion?.nombre || ""}</span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Asesor:
                </span>
                <span className="block text-sm">
                  {asesor.asignado ? "No asignado" : "Asignado"}
                </span>
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Campaña:
                </span>
                <span className="block text-sm">
                  <span className="block text-sm">
                    {campania?.nombre || ""}
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div className="w-full flex flex-row gap-x-4">
            <div className="w-full flex flex-col gap-y-1">
              <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                Comentario:
              </span>
              <span className="block text-sm">{comentario || ""}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="contained"
              color="success"
              sx={{ textTransform: "capitalize", borderRadius: 0 }}
              onClick={() => setShowDialog(true)}
            >
              Crear Evento
            </Button>
            {/* <Button
              variant="contained"
              color="info"
              sx={{ textTransform: "capitalize", borderRadius: 0 }}
            >
              <Link to={"cotizacion/"}>Generar Cotización</Link>
            </Button> */}
          </div>
          {/* SECCION DE ACCIONES SOBRE LEADS */}

          {isAsesor && (
            <>
              <div className="flex justify-center">
                {/* Columna 1 */}
                <ComponentWhatsapp
                  lead={idLead}
                  dataWhatsapp={whatsapps}
                  onUpdateDataWhatsapp={updateWhatsappMessage}
                  onCreateDataWhatsapp={createWhatsappMessage}
                />

                {/* Columna 2 */}
                <ComponentLlamadas
                  lead={idLead}
                  dataLlamada={llamadas}
                  onUpdatedataLlamada={updateLlamadaLead}
                  onCreatedataLlamada={createLlamadaLead}
                />
              </div>
            </>
          )}

          <div className="flex justify-center">
            <Button
              variant="contained"
              sx={{ borderRadius: 0, backgroundColor: "gray" }}
              onClick={onNavigateBack}
            >
              Volver
            </Button>
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
