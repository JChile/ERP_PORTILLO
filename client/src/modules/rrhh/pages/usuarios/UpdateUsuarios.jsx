import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsuarioPerfil } from "./helpers/getUsuarioPerfil";
import CustomTextField from "../../../../components/CustomTextField";
import { FilterRol } from "../../../../components/filters/roles/FilterRol";
import { Checkbox } from "@mui/material";
import useAlertMUI from "../../../../hooks/useAlertMUI";
import CustomAlert from "../../../../components/CustomAlert";
import { CustomCircularProgress } from "../../../../components/CustomCircularProgress";
import { updateUsuario } from "./helpers/updateUsuario";

export const UpdateUsuarios = () => {
  const { idUsuario } = useParams();
  const [usuario, setUsuario] = useState({
    first_name: "",
    last_name: "",
    email: "",
    groups: [],
    is_active: false,
  });
  const { first_name, last_name, email, groups, is_active } = usuario;

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

  const validarDatosUsuario = (first_name, last_name, email, groups) => {
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
    if (groups[0] === 0) {
      messages_error += "No proporciono ningun rol\n";
    }
    return messages_error;
  };

  const actualizarUsuario = async () => {
    const validate = validarDatosUsuario(first_name, last_name, email, groups);

    if (validate.length === 0) {
      console.log(usuario);
      setVisibleProgress(true);
      // const result = await updateUsuario(idUsuario, usuario);
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

  const obtenerUsuarioPerfil = async () => {
    const result = await getUsuarioPerfil(idUsuario);
    setUsuario(result);
  };

  useEffect(() => {
    obtenerUsuarioPerfil();
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
            {`${first_name[0]}${last_name[0]}`}
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
                  <FilterRol defaultValue={groups[0]} onNewInput={onAddGroup} />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={actualizarUsuario}
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
