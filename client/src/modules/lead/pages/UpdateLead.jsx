import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createLlamada, createWhatsapp, getLead, updateLead, updateLlamada, updateWhatsapp } from "../helpers"
import { Checkbox, Tab, Tabs } from "@mui/material"
import { useAlertMUI } from "../../../hooks"
import {
  CustomAlert,
  CustomCircularProgress,
  FilterEstadoLead,
  FilterEstadoSeparacion,
} from "../../../components"
import { FilterObjecion } from "../../../components/filters/objecion/FilterObjecion"
import { FilterAsesor } from "../../../components/filters/asesor/FilterAsesor"
import { AuthContext } from "../../../auth"
import { MuiTelInput } from "mui-tel-input"
import {
  combinarErrores,
  obtenerHoraActualFormatPostgress,
  validIdURL,
} from "../../../utils"
import { FilterProyectoCampania } from "../../../components/multiple-filters/proyecto-campania/FilterProyectoCampania"
import { ComponentLlamadas, ComponentWhatsapp } from "../components"
import ComponentEventos from "../components/ComponentEventos"
import { createEvent, updateEvent } from "../../ventas/helpers/eventCases"
import { FilterProyectoProducto } from "../../../components/multiple-filters"

export const UpdateLead = () => {
  const { idLead } = useParams()
  const numericId = parseInt(idLead)
  const { authTokens, currentUser } = useContext(AuthContext)

  const [flagLoading, setFlagLoading] = useState(false)

  const isAsesor = currentUser["groups"] === "asesor" ? true : false;
  const [tabIndex, setTabIndex] = useState(0);
  const [flagReload, setFlagReload] = useState(false);

  const [lead, setLead] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    celular2: "",
    importante: false,
    comentario: "",
    llamar: true,
    asesor: null,
    estadoLead: null,
    estadoSeparacionLead: null,
    objecion: null,
    campania: null,
    campaniaName: "",
    producto: null,
    productoName: "",
    llamadas: [],
    whatsapps: [],
    eventos: [],
  })

  const {
    nombre,
    apellido,
    celular,
    celular2,
    importante,
    comentario,
    llamar,
    asesor,
    estadoLead,
    estadoSeparacionLead,
    objecion,
    campania,
    campaniaName,
    producto,
    productoName,
    llamadas,
    whatsapps,
    eventos
  } = lead

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI()

  const [visibleProgress, setVisibleProgress] = useState(false)

  const obtenerLead = async (idLead) => {
    if (validIdURL(numericId)) {
      try {
        setVisibleProgress(true)
        const result = await getLead(idLead, authTokens["access"])
        console.log(result)
        const formatResult = {
          ...result,
          asesor: result.asesor ? result.asesor["id"] : null,
          campania: result.campania ? result.campania["id"] : null,
          campaniaName: result.campania ? result.campania["nombre"] : "",
          producto: result.producto ? result.producto["id"] : null,
          productoName: result.producto ? result.producto["nombre"] : "",
          objecion: result.objecion ? result.objecion["id"] : null,
          estadoLead: result.estadoLead ? result.estadoLead : null,
          estadoSeparacionLead: result.estadoSeparacionLead ? result.estadoSeparacionLead : null,
          usuarioCreador: result.usuarioCreador ? result.usuarioCreador.id : null,
          usuarioActualizador: result.usuarioActualizador ? result.usuarioActualizador.id : null
        }
        console.log(formatResult)
        setLead(formatResult)
        // comprobar si se realizo con exito la creación del usuario
        setVisibleProgress(false)
        setFlagLoading(true)
      } catch (error) {
        setVisibleProgress(false)
        const pilaError = combinarErrores(error)
        // mostramos feedback de error
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: pilaError,
        })
        handleClickFeedback()
      }
    } else {
      onNavigateBack()
    }
  }
  // change check llamada
  const onAddCheckInputLlamar = (event) => {
    setLead({ ...lead, llamar: !llamar })
  }

  // change check llamada
  const onAddCheckInputImportante = (event) => {
    setLead({ ...lead, importante: !importante })
  }

  // change campaña
  const onAddCampania = (item) => {
    const label = item["id"] ? item["label"] : ""
    setLead({ ...lead, campania: item.id, campaniaName: label })
  }

  // change producto
  const onAddProducto = (item) => {
    console.log(item)
    const label = item["id"] ? item["label"] : ""
    setLead({ ...lead, producto: item.id, productoName: label })
  }

  // change estado lead
  const onAddEstadoLead = (item) => {
    setLead({ ...lead, estadoLead: item.id })
  }

  // change asesor
  const onAddAsesor = (item) => {
    setLead({ ...lead, asesor: item.id })
  }

  // change objecion
  const onAddObjecion = (item) => {
    setLead({ ...lead, objecion: item.id })
  }

  // change objecion
  const onAddEstadoSeparacionLead = (item) => {
    setLead({ ...lead, estadoSeparacionLead: item.id })
  }

  const validateLead = () => {
    const errors = []

    // validacion de celular
    if (celular.length === 0) {
      errors.push("El celular es obligatorio")
    }

    // validacion de campaña
    if (!campania) {
      errors.push("Debes seleccionar una campaña")
    }

    // validacion de estado de lead
    if (!estadoLead) {
      errors.push("Debes seleccionar un estado de lead")
    }

    // validacion de objecion
    if (!objecion) {
      errors.push("Debes seleccionar una objecion")
    }

    return errors.join("\n")
  }

  const navigate = useNavigate()
  const onNavigateBack = () => {
    navigate(-1)
  }

  // ACCIONES DE GESTION
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
      setFlagReload(prev => !prev)
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

  const actualizarLead = async () => {
    // activamos el progress
    setVisibleProgress(true)
    const validationMessage = validateLead()

    if (validationMessage) {
      setVisibleProgress(false)
      // Si hay campos faltantes, mostrar una alerta con los mensajes de error concatenados
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: validationMessage,
      })
      handleClickFeedback()
    } else {
      try {
        console.log(lead)
        const formatLead = {
          ...lead,
          usuarioActualizador: currentUser["user_id"],
          fecha_actualizacion: obtenerHoraActualFormatPostgress(),
        }

        const result = await updateLead(
          idLead,
          formatLead,
          authTokens["access"]
        )
        setVisibleProgress(false)
        onNavigateBack()
      } catch (error) {
        console.log(error)
        setVisibleProgress(false)
        const pilaError = combinarErrores(error)
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: pilaError,
        })
        handleClickFeedback()
      }
    }
  }

  const handledForm = (event) => {
    const { name, value } = event.target
    setLead({
      ...lead,
      [name]: value,
    })
  }

  useEffect(() => {
    obtenerLead(idLead)
  }, [])

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5">
        <h1 className="text-lg font-bold">Actualizar Lead</h1>
        <hr className="my-4"></hr>
        {flagLoading && (
          <form method="post" className="min-w-[242px] flex gap-x-8">
            <div className="flex-1 flex flex-col gap-y-6">
              <label className="flex flex-col gap-y-1">
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

              <label className="flex flex-col gap-y-1">
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

              <label className="flex flex-col gap-y-1">
                <span className="block text-sm font-medium">Celular</span>
                <MuiTelInput
                  value={celular}
                  onChange={(value) => {
                    handledForm({
                      target: {
                        name: "celular",
                        value: value,
                      },
                    })
                  }}
                />
              </label>

              <label className="flex flex-col gap-y-1">
                <span className="block text-sm font-medium">Celular 2</span>
                <MuiTelInput
                  value={celular2}
                  onChange={(value) => {
                    handledForm({
                      target: {
                        name: "celular2",
                        value: value,
                      },
                    })
                  }}
                />
              </label>

              <div className="flex flex-row gap-x-4">
                <label className="flex flex-row gap-y-1">
                  <span className="text-sm font-medium flex items-center me-2">
                    Prioritario?
                  </span>
                  <Checkbox
                    name="importante"
                    checked={importante}
                    onChange={onAddCheckInputImportante}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </label>
                <label className="flex flex-row gap-y-1">
                  <span className="text-sm font-medium flex items-center me-2">
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
              <label className="flex flex-col gap-y-1">
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

            <div className="flex-1 flex flex-col gap-y-6">
              <label className="flex flex-col gap-y-1">
                <span className="block text-sm font-medium">Estado Lead</span>
                <FilterEstadoLead
                  defaultValue={estadoLead}
                  onNewInput={onAddEstadoLead}
                />
              </label>

              <label className="flex flex-col gap-y-1">
                <span className="block text-sm font-medium">Objeciones</span>
                <FilterObjecion
                  defaultValue={objecion}
                  onNewInput={onAddObjecion}
                />
              </label>

              <label className="flex flex-col gap-y-1">
                <span className="block text-sm font-medium">Estado separación</span>
                <FilterEstadoSeparacion
                  defaultValue={estadoSeparacionLead}
                  onNewInput={onAddEstadoSeparacionLead}
                />
              </label>

              <label className="flex flex-col gap-y-1">
                <span className="block text-sm font-medium">
                  Asesor Asignado
                </span>
                <FilterAsesor defaultValue={asesor} onNewInput={onAddAsesor} />
              </label>

              <label className="flex content-center gap-x-2">
                <span className="text-sm font-medium flex items-center">
                  <span className="mr-2">Campaña: </span>
                  {campaniaName.length !== 0 && (
                    <span className="inline-block px-2 py-1 text-sm font-semibold leading-none bg-blue-500 text-white rounded-full">
                      {campaniaName}
                    </span>
                  )}
                </span>
                <FilterProyectoCampania onAddCampania={onAddCampania} />
              </label>

              <label className="flex content-center gap-x-2">
                <span className="text-sm font-medium flex items-center">
                  <span className="mr-2">Producto: </span>
                  {productoName.length !== 0 && (
                    <span className="inline-block px-2 py-1 text-sm font-semibold leading-none bg-blue-500 text-white rounded-full">
                      {productoName}
                    </span>
                  )}
                </span>
                {/* <FilterProyectoCampania onAddCampania={onAddCampania} /> */}
                <FilterProyectoProducto onAddProducto={onAddProducto} />
              </label>
            </div>
          </form>
        )}
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
      </div>
      <div>
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
  )
}

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