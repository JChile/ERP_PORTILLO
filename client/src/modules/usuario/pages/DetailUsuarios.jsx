import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsuarioPerfil } from "../helpers";
import { combinarErrores, validIdURL } from "../../../utils";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { AuthContext } from "../../../auth";
import { useAlertMUI } from "../../../hooks";

export const DetailUsuarios = () => {
  const { authTokens } = useContext(AuthContext);
  const { idUsuario } = useParams();
  const numericId = parseInt(idUsuario);
  const [usuario, setUsuario] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    groups: "",
    is_active: false,
    isAdmin: "",
    codigoAsesor: "",
  });

  const {
    username,
    first_name,
    last_name,
    email,
    groups,
    is_active,
    isAdmin,
    codigoAsesor,
  } = usuario;

  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  // hook alert
  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  // ESTADOS PARA LA NAVEGACION
  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const obtenerUsuarioPerfil = async () => {
    if (validIdURL(numericId)) {
      setVisibleProgress(true);
      try {
        const result = await getUsuarioPerfil(idUsuario, authTokens["access"]);
        console.log(result);
        setUsuario(result);
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
            {`${first_name.length !== 0 ? first_name[0] : "-"}${
              last_name.length !== 0 ? last_name[0] : "-"
            }`}
          </div>

          <h1 className="text-2xl">
            {first_name} {last_name}
          </h1>
        </div>

        <div className="p-3 border-[1px] flex flex-col gap-y-4">
          <h2 className="text-xl">Login y rol de usuario</h2>
          <hr />

          <div className="flex flex-col md:flex-row min-w-[242px] gap-x-2 gap-y-3">
            <div className="w-full flex flex-col gap-y-3">
              <label className="flex gap-y-1 min-w-full">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Nombre usuario
                </span>
                <span className="block text-sm">{username}</span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Nombre
                </span>
                <span className="block text-sm">{first_name}</span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Esta activo
                </span>
                <span className="block text-sm">{is_active ? "Si" : "No"}</span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Es administrador
                </span>
                <span className="block text-sm">{isAdmin ? "Si" : "No"}</span>
              </label>
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Email trabajo
                </span>
                <span className="block text-sm">{email}</span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Apellido
                </span>
                <span className="block text-sm">{last_name}</span>
              </label>

              <label className="flex gap-y-1 ">
                <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                  Rol
                </span>
                <span className="block text-sm">
                  {groups.length === 0 ? "Sin rol" : groups["name"]}
                </span>
              </label>

              {groups.length !== 0 && groups["name"] === "asesor" && (
                <label className="flex gap-y-1 ">
                  <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                    Codigo asesor
                  </span>
                  <span className="block text-sm">{codigoAsesor}</span>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          onClick={onNavigateBack}
        >
          Volver
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
