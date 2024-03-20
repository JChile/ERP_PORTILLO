import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createLlamada,
  createWhatsapp,
  getLead,
  updateWhatsapp,
  updateLlamada,
} from "../helpers";
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ComponentLlamadas, ComponentWhatsapp } from "../components";
import { AuthContext } from "../../../auth";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { useAlertMUI } from "../../../hooks";
import {
  combinarErrores,
  formatDate_ISO861_to_formatdate,
  validIdURL,
} from "../../../utils";
import { MdArrowBack } from "react-icons/md";
import ComponentEventos from "../components/ComponentEventos";
import { createEvent, updateEvent } from "../../ventas/helpers/eventCases";
import { FaWhatsapp } from "react-icons/fa";

export const DetailLead = () => {
  const { idLead } = useParams();
  const numericId = parseInt(idLead);
  const { authTokens, currentUser } = useContext(AuthContext);

  const isAsesor = currentUser["groups"] === "asesor" ? true : false;
  const [tabIndex, setTabIndex] = useState(0);
  const [lead, setLead] = useState({
    nombre: "",
    apellido: "",
    asignado: false,
    celular: "",
    celular2: "",
    comentario: "",
    llamar: true,
    asesor: null,
    importante: false,
    estado: "A",
    estadoLead: "EP",
    estadoSeparacionLead: null,
    objecion: {
      nombre: "",
    },
    campania: {
      nombre: "",
    },
    llamadas: [],
    whatsapps: [],
    eventos: [],
    fecha_actualizacion: null,
    usuarioActualizador: null,
    fecha_asignacion: null,
    fecha_creacion: null,
    usuarioCreador: null,
    fecha_desasignacion: null,
    horaRecepcion: null,
  });

  const {
    nombre,
    apellido,
    celular,
    celular2,
    comentario,
    llamar,
    asesor,
    importante,
    estado,
    estadoLead,
    estadoSeparacionLead,
    objecion,
    campania,
    llamadas,
    whatsapps,
    eventos,
    asignado,
    fecha_actualizacion,
    usuarioActualizador,
    fecha_asignacion,
    usuarioCreador,
    fecha_creacion,
    fecha_desasignacion,
    horaRecepcion,
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

  const createEventoLead = async (itemData) => {
    try {
      const result = await createEvent(itemData, authTokens["access"]);
      const createDataEvento = [...eventos, result];
      setLead({
        ...lead,
        eventos: createDataEvento,
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

  const updateEventoLead = async (id, itemData) => {
    try {
      const result = await updateEvent(id, itemData, authTokens["access"]);
      const updateDataEvento = eventos.map((elemento) => {
        return elemento.id === id ? result : elemento;
      });
      setLead({
        ...lead,
        eventos: updateDataEvento,
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

  useEffect(() => {
    obtenerLead();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <Paper
          sx={{
            padding: "8px 16px",
            border: "0.5px solid #e5e7eb",
            borderRadius: "0px",
          }}
          elevation={0}
        >
          <Typography variant="h5">Detalle Lead</Typography>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            padding: "0.75rem",
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
            border: "0.5px solid #e5e7eb",
            borderRadius: "0px",
          }}
        >
          <div className="flex flex-col md:flex-row min-w-[242px] gap-x-2 gap-y-3">
            <div className="w-full flex flex-col gap-y-3">
              <label className="flex gap-y-1 min-w-full">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Nombre:
                </span>
                <span className="block text-sm">{nombre || ""}</span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Apellido:
                </span>
                <span className="block text-sm">{apellido || ""}</span>
              </label>

              <label className="flex gap-y-1">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Celular:
                </span>
                <a
                  target="_blank"
                  href={`https://wa.me/${celular}`}
                  className="text-sm flex align-middle gap-x-2"
                  rel="noopener"
                >
                  <FaWhatsapp color="green" size={18} />
                  {celular || ""}
                </a>
              </label>

              <div className="flex gap-y-1">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Celular2:
                </span>
                {celular2 && (
                  <a
                    target="_blank"
                    href={`https://wa.me/${celular2}`}
                    className="text-sm flex"
                    rel="noopener"
                  >
                    <FaWhatsapp color="green" size={18} />
                    {celular2 || ""}
                  </a>
                )}
              </div>

              <label className="flex gap-y-1 items-center">
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

              <label className="flex gap-y-1 items-center">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Prioritario:
                </span>
                <Checkbox
                  name="importante"
                  checked={importante}
                  disabled={true}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </label>
              {/* FECHA ENTREGA */}
              {horaRecepcion && (
                <label className="flex gap-y-1 ">
                  <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                    Fecha recepción:
                  </span>
                  <span className="block text-sm">
                    <span className="block text-sm">
                      {formatDate_ISO861_to_formatdate(horaRecepcion)}
                    </span>
                  </span>
                </label>
              )}
              {/* FECHA ASIGNACION */}
              {fecha_asignacion && (
                <label className="flex gap-y-1 ">
                  <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                    Fecha asignación:
                  </span>
                  <span className="block text-sm">
                    <span className="block text-sm">
                      {formatDate_ISO861_to_formatdate(fecha_asignacion)}
                    </span>
                  </span>
                </label>
              )}
              {/* FECHA DE CREACION */}
              {fecha_creacion && (
                <label className="flex gap-y-1 ">
                  <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                    Fecha creación:
                  </span>
                  <span className="block text-sm">
                    <span className="block text-sm">
                      {formatDate_ISO861_to_formatdate(fecha_creacion)}
                    </span>
                  </span>
                </label>
              )}
              {/* USUARIO CREADOR */}
              {usuarioCreador && (
                <label className="flex gap-y-1 ">
                  <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                    Usuario creador:
                  </span>
                  <span className="block text-sm">
                    <span className="block text-sm">{`${usuarioCreador["first_name"]} ${usuarioCreador["last_name"]}`}</span>
                  </span>
                </label>
              )}
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <label className=" flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Estado:
                </span>
                <span className="block text-sm">{estadoLead || ""}</span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Objeciones:
                </span>
                <span className="block text-sm">{objecion?.nombre || ""}</span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Estado separaciones:
                </span>
                <span className="block text-sm">
                  {estadoSeparacionLead?.nombre || "No registrado"}
                </span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  ¿Asignado?:
                </span>
                <span className="block text-sm">
                  {asignado ? "Asignado" : "No asignado"}
                </span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Asesor:
                </span>
                <span className="block text-sm">
                  {asesor
                    ? `${asesor["first_name"]} ${asesor["last_name"]}`
                    : "Asesor no asignado"}
                </span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Campaña:
                </span>
                <span className="block text-sm">
                  <span className="block text-sm">
                    {campania?.nombre || ""}
                  </span>
                </span>
              </label>
              {/* Estado activo */}
              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  ¿Activo?:
                </span>
                <span className="block text-sm">
                  <span className="block text-sm">
                    {estado === "A" ? "Activo" : "Inactivo"}
                  </span>
                </span>
              </label>
              {/* FECHA ACTUALIZACION */}
              {
                <label className="flex gap-y-1 ">
                  <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                    Fecha actualización:
                  </span>
                  <span className="block text-sm">
                    <span className="block text-sm">
                      {formatDate_ISO861_to_formatdate(fecha_actualizacion)}
                    </span>
                  </span>
                </label>
              }

              {/* USUARIO ACTUALIZAR */}
              {usuarioActualizador && (
                <label className="flex gap-y-1 ">
                  <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                    Usuario actualizador:
                  </span>
                  <span className="block text-sm">
                    <span className="block text-sm">{`${usuarioActualizador["first_name"]} ${usuarioActualizador["last_name"]}`}</span>
                  </span>
                </label>
              )}
              {/* FECHA DESASIGNACION */}
              {fecha_desasignacion && (
                <label className="flex gap-y-1 ">
                  <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                    Fecha desasignación:
                  </span>
                  <span className="block text-sm">
                    <span className="block text-sm">
                      {formatDate_ISO861_to_formatdate(fecha_desasignacion)}
                    </span>
                  </span>
                </label>
              )}
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
        </Paper>

        {isAsesor && (
          <React.Fragment>
            <Tabs
              aria-label="basic tabs"
              value={tabIndex}
              onChange={(event, newValue) => setTabIndex(newValue)}
              sx={{ marginTop: 3 }}
              centered
              variant="fullWidth"
            >
              <Tab sx={{ textTransform: "capitalize" }} label="Whatsapp" />
              <Tab sx={{ textTransform: "capitalize" }} label="Llamada" />
              <Tab sx={{ textTransform: "capitalize" }} label="Eventos" />
            </Tabs>

            <CustomTabPanel value={tabIndex} index={0}>
              <ComponentWhatsapp
                lead={idLead}
                dataWhatsapp={whatsapps}
                onUpdateDataWhatsapp={updateWhatsappMessage}
                onCreateDataWhatsapp={createWhatsappMessage}
              />
            </CustomTabPanel>
            <CustomTabPanel value={tabIndex} index={1}>
              <ComponentLlamadas
                lead={idLead}
                dataLlamada={llamadas}
                onUpdatedataLlamada={updateLlamadaLead}
                onCreatedataLlamada={createLlamadaLead}
              />
            </CustomTabPanel>

            <CustomTabPanel value={tabIndex} index={2}>
              <ComponentEventos
                lead={lead}
                dataEventos={eventos}
                onUpdateDataEvento={updateEventoLead}
                onCreateDataEvento={createEventoLead}
              />
            </CustomTabPanel>
          </React.Fragment>
        )}
        <Button
          startIcon={<MdArrowBack />}
          variant="contained"
          color="inherit"
          sx={{ textTransform: "capitalize", width: "6rem", marginX: "auto" }}
          onClick={onNavigateBack}
        >
          Volver
        </Button>
      </div>
      {/* COMPONENTE ALERTA */}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};

/**
 * Custom tab panel to use as tab wrapper.
 * @param {*} props
 * @returns
 */
const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      style={{ display: "flex", justifyContent: "center" }}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};
