import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { createUsuario } from "../helpers";
import {
  CustomPasswordField,
  CustomCircularProgress,
  FilterRol,
  CustomAlert,
  DynamicCustomerDialog,
} from "../../../components";
import { useAlertMUI } from "../../../hooks";
import { combinarErrores } from "../../../utils";
import { AuthContext } from "../../../auth";

export const CreateUsuarios = () => {
  const { authTokens } = useContext(AuthContext);
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    email: "",
    groups: { id: 0 },
    is_active: true,
    isAdmin: true,
    codigoAsesor: null,
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
    isAdmin,
    codigoAsesor,
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

  // estado para el dialogo
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // INPUT CODIGO MATERIA PRIMA
  const onAddGroup = ({ id }) => {
    const valorCodigoAsesor = id === 1 ? codigoAsesor : null;
    setUsuario({ ...usuario, groups: { id }, codigoAsesor: valorCodigoAsesor });
  };

  // INPUT CHECK ACTIVATE
  const onAddCheckInput = ({ target }) => {
    const { name, checked } = target;

    setUsuario({ ...usuario, [name]: checked });
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
    groups,
    codigoAsesor
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
    if (groups["id"] === 0) {
      messages_error += "No proporciono ningun rol\n";
    }

    if (codigoAsesor === null) {
      if (groups["id"] === 1) {
        messages_error +=
          "Si el rol es asesor, debes ingresar un código de asesor\n";
      }
    } else {
      if (codigoAsesor.length === 0) {
        messages_error +=
          "Si el rol es asesor, debes ingresar un código de asesor\n";
      }
    }
    return messages_error;
  };

  // CREAR USUARIO
  const crearUsuario = async () => {
    setVisibleProgress(true);
    const usuarioJSON = { ...usuario, groups: [groups["id"]] };
    delete usuarioJSON.confirm_password;
    try {
      const result = await createUsuario(usuarioJSON, authTokens["access"]);
      // comprobar si se realizo con exito la creación del usuario
      setVisibleProgress(false);
      // navegamos atras
      onNavigateBack();
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
  };

  const handledCrearUsuario = () => {
    const validate = validarDatosUsuario(
      first_name,
      last_name,
      email,
      username,
      password,
      confirm_password,
      groups,
      codigoAsesor
    );
    if (validate.length === 0) {
      if (is_active === false) {
        handleOpenDialog();
      } else {
        crearUsuario();
      }
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
                Usuario
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
                name="is_active"
                onChange={onAddCheckInput}
                inputProps={{ "aria-label": "controlled" }}
              />
            </label>
            <label className="block flex flex-row gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium flex items-center me-2">
                Es administrador
              </span>
              <Checkbox
                checked={isAdmin}
                name="isAdmin"
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
              <FilterRol onNewInput={onAddGroup} defaultValue={groups["id"]} />
            </label>

            {groups["id"] === 1 && (
              <label className="block flex flex-col gap-y-1">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Código asesor
                </span>
                <input
                  type="text"
                  name="codigoAsesor"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  value={codigoAsesor === null ? "" : codigoAsesor}
                  onChange={handledForm}
                />
              </label>
            )}
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={handledCrearUsuario}
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
      {/* DIALOGO */}
      <DynamicCustomerDialog
        open={dialogOpen}
        title={"Alerta usuario inactivo"}
        description={`Se ha indicado que el usuario estará inactivo. ¿Deseas confirmar la operación?`}
        onClose={handleCloseDialog}
        onConfirm={crearUsuario}
      />
      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
