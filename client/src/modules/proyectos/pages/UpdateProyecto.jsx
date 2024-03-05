import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem, Select, TextField } from "@mui/material";
import { useAlertMUI } from "../../../hooks";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import {
  createImagenProyecto,
  createVideoProyecto,
  getProyecto,
  updateProyecto,
} from "../helpers";
import { combinarErrores, validIdURL } from "../../../utils";
import { AuthContext } from "../../../auth";
import CarouselComponentImageAdd from "../components/CarouselImageAdd";
import CarouselComponentVideoAdd from "../components/CarouselVideoAdd";

export const UpdateProyecto = () => {
  const { authTokens, currentUser } = useContext(AuthContext);
  const { idProyecto } = useParams();

  const [flagLoading, setFlagLoading] = useState(false);

  const numericId = parseInt(idProyecto);
  const [project, setProject] = useState({
    nombre: "",
    codigo: "",
    ubicacion: "",
    descripcion: "",
    estado: "",
    imagenes: [],
    videos: [],
  });

  const { nombre, codigo, ubicacion, descripcion, estado, imagenes, videos } =
    project;
  const [imageList, setImageList] = useState([]);
  const [videoList, setVideoList] = useState([]);

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const [visibleProgress, setVisibleProgress] = useState(false);

  const obtenerProyecto = async () => {
    if (validIdURL(numericId)) {
      setVisibleProgress(true);
      try {
        const result = await getProyecto(idProyecto, authTokens["access"]);
        setProject({
          ...result,
          imagenes: result.imagenes,
          videos: result.videos,
        });
        setVisibleProgress(false);
        setFlagLoading(true);
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

  const handledForm = (event) => {
    const { name, value } = event.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const validateProject = (nombre, ubicacion, codigo) => {
    const errors = [];

    if (!nombre) {
      errors.push("- El nombre del proyecto es obligatorio.");
    }
    if (!ubicacion) {
      errors.push("- La ubicacion es obligatoria.");
    }
    if (!codigo) {
      errors.push("- El código es obligatorio.");
    }
    return errors.join("\n");
  };

  const actualizarProyecto = async () => {
    const validationMessage = validateProject(nombre, ubicacion, codigo);

    if (validationMessage) {
      // Si hay campos faltantes, mostrar una alerta con los mensajes de error concatenados
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: validationMessage,
      });
      handleClickFeedback();
    } else {
      setVisibleProgress(true);
      try {
        const formatProject = {
          ...project,
          usuarioActualizador: currentUser["user_id"],
          usuarioCreador: currentUser["user_id"],
        };
        const result = await updateProyecto(
          idProyecto,
          formatProject,
          authTokens["access"]
        );
        try {
          for (const imageFile of imageList) {
            if (typeof imageFile === "undefined") {
              return;
            }
            const formData = new FormData();
            formData.append("imagen", imageFile);
            formData.append("proyecto", idProyecto);
            const imgs = await createImagenProyecto(formData);
            console.log("imagen creado exitosamente");
          }
          for (const videoFile of videoList) {
            if (typeof videoFile === "undefined") {
              return;
            }
            const formData = new FormData();
            formData.append("video", videoFile);
            formData.append("proyecto", idProyecto);
            const vid = await createVideoProyecto(formData);
            console.log("video creado exitosamente");
          }
        } catch (error) {
          console.error(error);
        }
        setVisibleProgress(false);
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
    }
  };

  const handleFileSelect = (event) => {
    const previewContainerImage = document.getElementById(
      "preview-containerImage"
    );
    const previewContainerVideo = document.getElementById(
      "preview-containerVideo"
    );

    const files = event.target.files;

    for (const file of files) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const previewContainer = document.createElement("div");

        if (file.type.includes("image")) {
          previewContainer.className =
            "relative w-24 h-24 border border-gray-300 rounded overflow-hidden";
          const img = document.createElement("img");
          img.src = e.target.result;
          img.className = "w-full h-full object-cover";
          previewContainer.appendChild(img);

          setImageList((prevList) => [...prevList, file]);
        } else if (file.type.includes("video")) {
          previewContainer.className =
            "relative w-40 h-40 border border-gray-300 rounded overflow-hidden";
          const video = document.createElement("video");
          video.src = e.target.result;
          video.className = "w-full h-full object-cover";
          video.setAttribute("controls", "");
          previewContainer.appendChild(video);

          setVideoList((prevList) => [...prevList, file]);
        }

        const closeIcon = document.createElement("div");
        closeIcon.className =
          "absolute top-0 right-0 cursor-pointer p-1 rounded-full bg-red-500 text-white";
        closeIcon.innerHTML = "x";
        closeIcon.addEventListener("click", () => {
          // Eliminar la previsualización al hacer clic en la "X"
          if (file.type.includes("image")) {
            const fileInput = document.getElementById("fileImage");
            fileInput.value = "";
            previewContainer.parentNode.removeChild(previewContainer);
            setImageList((prevList) => prevList.filter((img) => img !== file));
          } else if (file.type.includes("video")) {
            const fileInputVideo = document.getElementById("fileVideo");
            fileInputVideo.value = "";
            previewContainer.parentNode.removeChild(previewContainer);
            setVideoList((prevList) =>
              prevList.filter((video) => video !== file)
            );
          }
        });

        previewContainer.appendChild(closeIcon);

        if (file.type.includes("image")) {
          previewContainerImage.appendChild(previewContainer);
        } else if (file.type.includes("video")) {
          previewContainerVideo.appendChild(previewContainer);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    obtenerProyecto();
  }, []);

  return (
    <>
      <div className="relative p-5">
        <h1 className="text-lg font-bold">Modificar Proyecto</h1>
        <hr className="my-4"></hr>
        {flagLoading && (
          <form
            method="post"
            className="min-w-[242px] flex flex-col gap-y-6 gap-x-8"
          >
            <div className="flex flex-row gap-y-6 gap-x-8">
              <div className="w-6/12 flex flex-col gap-y-5">
                <label className="flex flex-col gap-y-1 ">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Nombre del proyecto
                  </span>
                  <input
                    type="text"
                    name="nombre"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Nombre del proyecto"
                    autoComplete="off"
                    value={nombre}
                    disabled={true}
                    onChange={handledForm}
                  />
                </label>

                <label className="flex flex-col gap-y-1 ">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Código del proyecto
                  </span>
                  <input
                    type="text"
                    name="codigo"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Código del proyecto"
                    autoComplete="off"
                    value={codigo}
                    disabled={true}
                    onChange={handledForm}
                  />
                </label>
              </div>

              <div className="w-6/12 flex flex-col gap-y-5">
                <label htmlFor="ubicacion" className="flex flex-col gap-y-1">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Ubicacion
                  </span>
                  <input
                    type="text"
                    name="ubicacion"
                    id="ubicacion"
                    placeholder="Ubicacion"
                    value={ubicacion}
                    onChange={handledForm}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>

                <label className="flex flex-col gap-y-1">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Estado inicial
                  </span>
                  <Select
                    name="estado"
                    value={estado}
                    onChange={handledForm}
                    style={{
                      height: "2.64rem", // Ajusta el valor según tus necesidades
                      paddingTop: "1rem", // Ajusta el valor según tus necesidades
                      paddingBottom: "1rem",
                    }}
                    className="bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  >
                    <MenuItem value="A">Activo</MenuItem>
                    <MenuItem value="I">Inactivo</MenuItem>
                  </Select>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="descripcion" className=" flex flex-col gap-y-1">
                <span className=" block text-sm font-medium">Descripción</span>
                <TextField
                  name="descripcion"
                  onChange={handledForm}
                  id="descripcion"
                  value={descripcion}
                  multiline
                  rows={2}
                  inputProps={{
                    style: {
                      width: "100%",
                      overflowWrap: "break-word",
                    },
                  }}
                />
              </label>
            </div>
            <div className="flex flex-row gap-y-6 gap-x-8">
              <div className="w-6/12 flex flex-col gap-y-5 border border-gray-300 p-4 rounded-md">
                <h3>Imagenes</h3>
                <div className="items-center mx-auto">
                  <CarouselComponentImageAdd
                    images={imagenes}
                    handleFileSelect={handleFileSelect}
                    obtenerProyecto={obtenerProyecto}
                  />
                </div>
                <div
                  className="flex gap-2 mt-4"
                  id="preview-containerImage"
                ></div>
              </div>

              <div className="w-6/12 flex flex-col gap-y-5 border border-gray-300 p-4 rounded-md">
                <h3>Videos</h3>
                <div className="items-center mx-auto">
                  <CarouselComponentVideoAdd
                    videos={videos}
                    handleFileSelect={handleFileSelect}
                    obtenerProyecto={obtenerProyecto}
                  />
                </div>
                <div
                  className="flex gap-2 mt-4"
                  id="preview-containerVideo"
                ></div>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={actualizarProyecto}
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
