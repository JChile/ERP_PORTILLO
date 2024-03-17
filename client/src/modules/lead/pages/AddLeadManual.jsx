import React, { useContext, useState } from "react"
import { Checkbox } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { createLead } from "../helpers"
import {
  CustomAlert,
  FilterCampania,
  CustomCircularProgress,
} from "../../../components"
import { FilterEstadoLead } from "../../../components/filters/estado_leads/FilterEstadoLead"
import { FilterObjecion } from "../../../components/filters/objecion/FilterObjecion"
import { FilterAsesor } from "../../../components/filters/asesor/FilterAsesor"
import { useAlertMUI } from "../../../hooks"
import { MuiTelInput } from "mui-tel-input"
import { AuthContext } from "../../../auth"
import { combinarErrores, formatCelular } from "../../../utils"
import { FilterProyectoCampania } from "../../../components/multiple-filters/proyecto-campania/FilterProyectoCampania"

export const AddLeadManual = () => {
  const { authTokens, currentUser } = useContext(AuthContext)
  const [lead, setLead] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    celular2: "",
    telefono: "",
    importante: false,
    comentario: "",
    llamar: true,
    asesor: null,
    estadoLead: "EP",
    objecion: 1,
    campania: null,
    campaniaName: "",
    horaRecepcion: "",
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
    objecion,
    horaRecepcion,
    campania,
    campaniaName,
  } = lead

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI()

  const [visibleProgress, setVisibleProgress] = useState(false)

  const navigate = useNavigate()
  const onNavigateBack = () => {
    navigate(-1)
  }

  const handledForm = ({ target }) => {
    const { name, value } = target
    setLead({ ...lead, [name]: value })
  }

  const onAddCheckInputLlamar = (event) => {
    setLead({ ...lead, llamar: !llamar })
  }

  const onAddCheckInputImportante = (event) => {
    setLead({ ...lead, importante: !importante })
  }

  const onAddCampania = (item) => {
    const label = item["id"] ? item["label"] : ""
    setLead({ ...lead, campania: item.id, campaniaName: label })
  }

  const onAddEstadoLead = (item) => {
    setLead({ ...lead, estadoLead: item.id })
  }

  const onAddAsesor = (item) => {
    setLead({ ...lead, asesor: item.id })
  }

  const onAddObjecion = (item) => {
    setLead({ ...lead, objecion: item.id })
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

  const crearLead = async () => {
    const validationMessage = validateLead()
    if (validationMessage) {
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: validationMessage,
      })
      handleClickFeedback()
    } else {
      setVisibleProgress(true)
      try {
        // formateamos la data
        const formatLead = {
          ...lead,
          usuarioCreador: currentUser["user_id"],
        }

        // eliminamos el label de nombre usado
        delete formatLead.campaniaName

        // si no se proporciono una hora de recepcion
        if (lead["horaRecepcion"].length === 0) {
          delete formatLead.horaRecepcion
        }

        console.log(formatLead)
        const result = await createLead(formatLead, authTokens["access"])
        setVisibleProgress(false)
        onNavigateBack()
      } catch (error) {
        // ocultar el progress
        setVisibleProgress(false)
        const pilaError = combinarErrores(error)
        // mostramos feedback de error
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: pilaError,
        })
        handleClickFeedback()
      }
    }
  }
  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5">
        <h1 className="text-lg font-bold">Añadir lead manualmente</h1>
        <hr className="my-4"></hr>
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
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 text-sm font-medium flex items-center me-2">
                Celular
              </span>
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

            <label htmlFor="horaRecepcion" className="flex flex-col gap-y-1">
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
          </div>

          <div className="flex-1 flex flex-col gap-y-6">
            <label className="flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Estado Lead</span>
              <FilterEstadoLead
                onNewInput={onAddEstadoLead}
                defaultValue={estadoLead}
              />
            </label>

            <label className="flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Objecion</span>
              <FilterObjecion
                onNewInput={onAddObjecion}
                defaultValue={objecion}
              />
            </label>

            <label className="flex flex-col gap-y-1">
              <span className="block text-sm font-medium">Asesor Asignado</span>
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
                {/* {`Campaña: ${campaniaName}`} */}
              </span>
              <FilterProyectoCampania onAddCampania={onAddCampania} />
            </label>

            <label className="flex flex-col gap-y-1">
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
  )
}
