import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { getUsuarioPerfil, updateUsuario } from "../helpers";
import {
  CustomTextField,
  CustomCircularProgress,
  FilterRol,
  CustomAlert,
  DynamicCustomerDialog,
} from "../../../components";
import { useAlertMUI } from "../../../hooks";
import { combinarErrores, validIdURL } from "../../../utils";
import { AuthContext } from "../../../auth";

export const UpdateUsuarios = () => {
  const { authTokens } = useContext(AuthContext);
  const { idUsuario } = useParams();
  const numericId = parseInt(idUsuario);
  const [usuario, setUsuario] = useState({
    first_name: "",
    last_name: "",
    email: "",
    groups: {},
    is_active: false,
    isAdmin: false,
    codigoAsesor: null,
    codigoAsesorBefore: null,
    groupsBefore: {},
  });
  const {
    first_name,
    last_name,
    email,
    groups,
    is_active,
    isAdmin,
    codigoAsesor,
    codigoAsesorBefore,
    groupsBefore,
  } = usuario;

  // HANDLED FORM
  const handledForm = ({ target }) => {
    const { name, value } = target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

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

  // estado para el dialogo
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // ESTADOS PARA LA NAVEGACION
  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  // INPUT CODIGO MATERIA PRIMA
  const onAddGroup = ({ id }) => {
    const valorCodigoAsesor = id === 1 ? codigoAsesorBefore : null;
    setUsuario({ ...usuario, groups: { id }, codigoAsesor: valorCodigoAsesor });
  };

  // INPUT CHECK ACTIVATE
  const onAddCheckInput = ({ target }) => {
    const { name, checked } = target;

    setUsuario({ ...usuario, [name]: checked });
  };

  const validarDatosUsuario = (
    first_name,
    last_name,
    email,
    groups,
    codigoAsesor
  ) => {
    var messages_error = "";
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
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

  // funcion asincrona para actualizar un usuario
  const actualizarUsuario = async ({ desasociar }) => {
    const usuarioJSON = { ...usuario, desasociar, groups: [groups["id"]] };
    delete usuarioJSON.id;
    if (codigoAsesor === codigoAsesorBefore) {
      delete usuarioJSON.codigoAsesor;
    }
    delete usuarioJSON.codigoAsesorBefore;
    delete usuarioJSON.groupsBefore;
    console.log(usuarioJSON);
    setVisibleProgress(true);

    try {
      const result = await updateUsuario(
        idUsuario,
        usuarioJSON,
        authTokens["access"]
      );
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

  const handledActualizaciónUsuario = () => {
    // primero validamos el correcto ingreso de datos
    const validate = validarDatosUsuario(
      first_name,
      last_name,
      email,
      groups,
      codigoAsesor
    );
    if (validate.length === 0) {
      // verificamos si se indico que el usuario estara inactivo o hubo un cambio de rol
      if (is_active === false || groupsBefore["id"] !== groups["id"]) {
        handleOpenDialog();
      } else {
        actualizarUsuario({ desasociar: false });
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

  // funcion asincrona para traer informacion del usuario
  const obtenerUsuario = async () => {
    if (validIdURL(numericId)) {
      setVisibleProgress(true);
      try {
        const result = await getUsuarioPerfil(idUsuario, authTokens["access"]);
        const codigoAsesorBefore = result["codigoAsesor"];
        const groupsBefore = result["groups"];
        setUsuario({ ...result, codigoAsesorBefore, groupsBefore });
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

  // use effect para la carga inicial de informacion del usuario
  useEffect(() => {
    obtenerUsuario();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="p-3 border-[1px] flex items-center gap-x-5">
          <div
            style={{
              background: "black",
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "22px",
            }}
          >
            {`${first_name.length !== 0 ? first_name[0] : "-"}${
              last_name.length !== 0 ? last_name[0] : "-"
            }`}
          </div>

          <h1 className="text-2xl">
            {`Editando - ${first_name} ${last_name}`}
          </h1>
        </div>

        <div className="p-3 border-[1px] flex flex-col gap-y-4">
          <h2 className="text-xl">Login y rol de usuario</h2>
          <hr />

          <div className="flex flex-col md:flex-row min-w-[242px] gap-x-2 gap-y-3">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Email trabajo
                </span>
                <CustomTextField
                  name={"email"}
                  value={email}
                  handledForm={handledForm}
                />
              </label>

              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Apellidos
                </span>
                <CustomTextField
                  name={"last_name"}
                  value={last_name}
                  handledForm={handledForm}
                />
              </label>

              <label className="block flex flex-row gap-y-1">
                <span className="block text-sm font-medium text-zinc-500 flex items-center me-2">
                  Activo
                </span>
                <Checkbox
                  checked={is_active}
                  name="is_active"
                  onChange={onAddCheckInput}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </label>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <label className="block flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Nombres
                </span>
                <CustomTextField
                  name={"first_name"}
                  value={first_name}
                  handledForm={handledForm}
                />
              </label>

              <label className="block flex gap-y-1">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Rol
                </span>
                <div className="flex-1">
                  {groups.length !== 0 && (
                    <FilterRol
                      defaultValue={groups["id"]}
                      onNewInput={onAddGroup}
                    />
                  )}
                </div>
              </label>

              {groups["id"] === 1 && (
                <label className="block flex gap-y-1 ">
                  <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                    Código asesor
                  </span>
                  <CustomTextField
                    name={"codigoAsesor"}
                    value={codigoAsesor === null ? "" : codigoAsesor}
                    handledForm={handledForm}
                  />
                </label>
              )}

              <label className="block flex flex-row gap-y-1">
                <span className="block text-sm font-medium text-zinc-500 flex items-center me-2">
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
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={handledActualizaciónUsuario}
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
        title={`${is_active === false ? "Alerta usuario inactivo - " : ""}${
          groupsBefore["id"] !== groups["id"]
            ? " Alerta cambio de rol usuario"
            : ""
        }`}
        description={`${
          is_active === false
            ? `Se ha indicado que el usuario estará inactivo. ${
                groups["id"] === 1
                  ? "El usuario a modificar es asesor. Recuerda que esta operación desasociará sus lead en un rango de 1 mes."
                  : ""
              }`
            : ""
        }
            ${
              groupsBefore["id"] !== groups["id"]
                ? ` Este usuario tenia asignado otro rol. ${
                    groupsBefore["id"] === 1
                      ? "Se ha detectado que este usuario era asesor. Recuerda que esta operación desasociará sus lead en un rango de 1 mes."
                      : ""
                  }`
                : ""
            } ¿Deseas confirmar la operación?`}
        onClose={handleCloseDialog}
        onConfirm={() => {
          actualizarUsuario({
            desasociar:
              (groupsBefore["id"] === 1 &&
                groupsBefore["id"] !== groups["id"]) ||
              (groups["id"] === 1 && is_active === false)
                ? true
                : false,
          });
        }}
      />
      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
