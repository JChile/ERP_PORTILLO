import React, { useState } from "react";
import { FilterRol } from "../../../../components/filters/roles/FilterRol";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import useAlertMUI from "../../../../hooks/useAlertMUI";
import CustomAlert from "../../../../components/CustomAlert";
import { createUsuario } from "./helpers/createUsuario";
import { CustomCircularProgress } from "../../../../components/CustomCircularProgress";
import { CustomPasswordField } from "../../../../components/CustomPasswordField";

export const CreateUsuarios = () => {
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    email: "",
    groups: [0],
    is_active: true,
    perfil: {},
  });

  const {
    username,
    password,
    first_name,
    last_name,
    email,
    confirm_password,
    groups,
    is_active,
  } = usuario;

  // hook alert
  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  // ESTADOS PARA LA NAVEGACION
  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  // INPUT CODIGO MATERIA PRIMA
  const onAddGroup = ({ id }) => {
    setUsuario({ ...usuario, groups: [id] });
  };

  // INPUT CHECK ACTIVATE
  const onAddCheckInput = (event) => {
    setUsuario({ ...usuario, is_active: !is_active });
  };

  // HANDLED FORM
  const handledForm = ({ target }) => {
    const { name, value } = target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const validarDatosUsuario = (
    first_name,
    last_name,
    email,
    username,
    password,
    confirm_password,
    groups
  ) => {
    var messages_error = "";
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (username.length === 0) {
      messages_error += "No proporciono username\n";
    }
    if (email.length === 0) {
      messages_error += "No proporciono email\n";
    } else {
      if (!emailPattern.test(email)) {
        messages_error += "El email no cumple con el formato adecuado\n";
      }
    }
    if (first_name.length === 0) {
      messages_error += "No proporciono ningun nombre\n";
    }
    if (last_name.length === 0) {
      messages_error += "No proporciono ningun apellido\n";
    }
    if (password.length === 0) {
      messages_error += "No proporciono ninguna contraseña\n";
    } else {
      if (password !== confirm_password) {
        messages_error += "Las constraseñas no coinciden\n";
      }
    }
    if (groups[0] === 0) {
      messages_error += "No proporciono ningun rol\n";
    }
    return messages_error;
  };

  // CREAR USUARIO
  const crearUsuario = async () => {
    const validate = validarDatosUsuario(
      first_name,
      last_name,
      email,
      username,
      password,
      confirm_password,
      groups
    );
    if (validate.length === 0) {
      setVisibleProgress(true);
      const usuarioJSON = { ...usuario };
      delete usuarioJSON.confirm_password;
      console.log(usuarioJSON);
      const result = await createUsuario(usuarioJSON);
      // comprobar si se realizo con exito la creación del usuario
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

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5">
        <h1 className="text-2xl my-1">Login y Rol Usuarios</h1>
        <hr className="my-4"></hr>
        <form method="post" className="min-w-[242px] flex gap-y-6 gap-x-8">
          <div className="w-6/12 flex flex-col gap-y-5">
            <label className="block flex flex-col gap-y-1 ">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Nombre Usuario
              </span>
              <input
                type="text"
                name="username"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Nombre Usuario"
                value={username}
                onChange={handledForm}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Nombre
              </span>
              <input
                type="text"
                name="first_name"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Nombre"
                value={first_name}
                onChange={handledForm}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Contraseña
              </span>
              <CustomPasswordField
                name={"password"}
                handledPassword={handledForm}
              />
            </label>

            <label className="block flex flex-row gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium flex items-center me-2">
                Activo
              </span>
              <Checkbox
                checked={is_active}
                onChange={onAddCheckInput}
                inputProps={{ "aria-label": "controlled" }}
              />
            </label>
          </div>

          <div className="w-6/12 flex flex-col gap-y-5">
            <label className="block flex flex-col gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Correo Trabajo
              </span>
              <input
                type="text"
                name="email"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Contraseña"
                value={email}
                onChange={handledForm}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Apellido
              </span>
              <input
                type="text"
                name="last_name"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Apellido"
                value={last_name}
                onChange={handledForm}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Confirmar contraseña
              </span>
              <CustomPasswordField
                name={"confirm_password"}
                handledPassword={handledForm}
              />
            </label>

            <label className="block flex flex-col gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                Rol
              </span>
              <FilterRol onNewInput={onAddGroup} />
            </label>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={crearUsuario}
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
