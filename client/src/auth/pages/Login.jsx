import React, { useContext, useState } from "react"
import { AuthContext } from "../context"
import PortilloLogo from "../../assets/portillo-logo-port.png"
import { useAlertMUI } from "../../hooks"
import { CustomAlert, CustomCircularProgress } from "../../components"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import BackgroundStart from "../../assets/background-option4.jpg"

export const Login = () => {
  // context
  const { loginUser } = useContext(AuthContext)
  // Estado de credenciales
  const [form, setForm] = useState({ username: "", password: "" })
  const { username, password } = form
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  // hook alert
  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI()

  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false)

  // handler credenciales
  const onFormChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // vaciar campos
  const vaciarForm = () => {
    setForm({ username: "", password: "" })
  }

  // validar envio de campos
  const validarDatosAutenticacion = (username, password) => {
    var messages_error = ""
    if (username.length === 0) {
      messages_error += "Proporcione un username\n"
    }
    if (password.length === 0) {
      messages_error += "Proporciones una contraseña"
    }

    return messages_error
  }

  // funcion de logeo
  const login = async (e) => {
    e.preventDefault()
    setVisibleProgress(true)
    const validate = validarDatosAutenticacion(username, password)
    // si los campos enviados son validos
    if (validate.length === 0) {
      try {
        const result = await loginUser(username, password, setVisibleProgress)
        const { detail } = result
        // si no hubo error al obtener el detail mostramos el error
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: detail,
        })
        handleClickFeedback()
        // vaceamos los campos del form
        vaciarForm()
      } catch (error) {
        // set visible
        setVisibleProgress(false)
        // mostramos el error
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: error.message,
        })
        handleClickFeedback()
      }
    } else {
      setVisibleProgress(false)
      // mostramos feedback
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: validate,
      })
      handleClickFeedback()
    }
  }

  return (
    <>
      <div className="grid place-content-center h-screen" style={{ backgroundImage: `url('${BackgroundStart}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="grid place-content-center rounded-t-lg bg-gray-400 p-4">
          <img src={PortilloLogo} alt="portillo's logo" />
        </div>
        <div className="flex flex-col gap-y-6 bg-rose-700 p-8 rounded-b-lg">
          <h1 className="text-center font-extrabold text-white ">
            Inicio de Sesión
          </h1>
          <form className="min-w-[242px] flex flex-col gap-y-6">
            <label className=" flex flex-col gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium text-white">
                Usuario
              </span>
              <input
                type="text"
                name="username"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                value={username}
                onChange={onFormChange}
              />
            </label>

            <label className="flex flex-col gap-y-1 relative">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium text-white">
                Contraseña
              </span>
              <div className="relative">
                <input
                  onChange={onFormChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-1 top-2.5 mt-1 mr-2 text-slate-400 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="bg-sky-700 text-white py-2 rounded"
              onClick={login}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}

      {/* COMPONENTE ALERTA */}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
    </>
  )
}
