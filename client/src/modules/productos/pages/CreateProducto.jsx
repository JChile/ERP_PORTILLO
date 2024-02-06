import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createImagenProducto, createProducto, createVideoProducto } from "../helpers";
import { useAlertMUI } from "../../../hooks";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { FilterProyectos } from "../../../components";
import { FilterTipoProducto } from "../../../components";
import { combinarErrores } from "../../../utils";
import { AuthContext } from "../../../auth";
import { v4 as uuidv4 } from "uuid";
import { IoIosAddCircleOutline } from "react-icons/io";

export const CreateProducto = () => {
  const { authTokens, currentUser } = useContext(AuthContext);
  const uniqueId = uuidv4();
  const [product, setProduct] = useState({
    nombre: "",
    numero: 0.0,
    area: 0.0,
    tipo: null,
    proyecto: null,
    estado: "A",
  });
  const [imageList, setImageList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const { nombre, numero, area, tipo, proyecto, estado } = product;

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const [visibleProgress, setVisibleProgress] = useState(false);

  const handledForm = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const onAddTipoProducto = (item) => {
    setProduct({ ...product, tipo: item.id });
  };
  const onAddProyecto = (item) => {
    setProduct({ ...product, proyecto: item.id });
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const validateProject = (nombre, numero, area, tipo, proyecto) => {
    const errors = [];

    if (!nombre) {
      errors.push("- El nombre del proyecto es obligatorio.");
    }
    if (numero<0) {
      errors.push("- El número debe ser mayor que 0.");
    }
    if (numero % 1 !== 0) {
      errors.push("- El número debe ser un entero.");
    }
    if (!numero) {
      errors.push("- El número es obligatorio.");
    }
    if (area<0) {
      errors.push("- El área no puede ser negativo.");
    }
    if (!area) {
      errors.push("- El área es obligatorio.");
    }
    if (!tipo) {
      errors.push("- El tipo es obligatorio.");
    }
    if (!proyecto) {
      errors.push("- El proyecto es obligatorio.");
    }
    return errors.join("\n");
  };

  const crearProyecto = async () => {
    const validationMessage = validateProject(
      nombre,
      numero,
      area,
      tipo,
      proyecto
    );

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
        const formatData = {
          ...product,
          codigo: uuidv4(),
          usuarioCreador: currentUser["user_id"],
          usuarioActualizador: currentUser["user_id"],
        };
        const result = await createProducto(formatData, authTokens["access"]);
        try {
          for (const imageFile of imageList) {
            if (typeof imageFile === "undefined") {
              return;
            }
            const formData = new FormData();
            formData.append("imagen", imageFile);
            formData.append("producto", result.id);
            const imgs = await createImagenProducto(formData);
            console.log("imagen creado exitosamente");
          }
          for (const videoFile of videoList) {
            if (typeof videoFile === "undefined") {
              return;
            }
            const formData = new FormData();
            formData.append("video", videoFile);
            formData.append("producto", result.id);
            const vid = await createVideoProducto(formData);
            console.log("video creado exitosamente");
          }
        } catch (error) {
          console.error(error);
        }
        setVisibleProgress(false);
        onNavigateBack();
      } catch (error) {
        console.log(error);
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

  return (
    <>
      <div className="relative p-5">
        <h1 className="text-lg font-bold">Crear Producto</h1>
        <hr className="my-4"></hr>
        <form
          method="post"
          className="min-w-[242px] flex flex-col gap-y-6 gap-x-8"
        >
          <div className="flex flex-row gap-y-6 gap-x-8">
            <div className="w-6/12 flex flex-col gap-y-5">
              <label className="flex flex-col gap-y-1 ">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Nombre del producto
                </span>
                <input
                  type="text"
                  name="nombre"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Nombre del producto"
                  autoComplete="off"
                  value={nombre}
                  onChange={handledForm}
                />
              </label>

              <label htmlFor="numero" className="flex flex-col gap-y-1">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Numero
                </span>
                <input
                  type="number"
                  name="numero"
                  id="numero"
                  placeholder="numero"
                  value={numero}
                  onChange={handledForm}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </label>

              <label htmlFor="area" className="flex flex-col gap-y-1">
                <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                  Area
                </span>
                <input
                  type="number"
                  name="area"
                  id="area"
                  placeholder="area"
                  value={area}
                  onChange={handledForm}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
              </label>
            </div>

            <div className="w-6/12 flex flex-col gap-y-5">
              <label className="flex flex-col gap-y-1">
                <span className="block text-sm font-medium">
                  Tipo de Producto
                </span>
                <FilterTipoProducto
                  onNewInput={onAddTipoProducto}
                  defaultValue={tipo}
                />
              </label>

              <label className="flex flex-col gap-y-1">
                <span className="block text-sm font-medium">Proyecto</span>
                <FilterProyectos
                  onNewInput={onAddProyecto}
                  defaultValue={proyecto}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-row gap-y-6 gap-x-8">
            <div className="w-6/12 flex flex-col gap-y-5 border border-gray-300 p-4 rounded-md">
              <div className="w-6/12 flex flex-col gap-y-6">
                <label htmlFor="file" className="flex flex-col gap-y-1">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Imágenes
                  </span>
                  <div className="bg-green-500 hover:bg-green-600 rounded">
                    <input
                      type="file"
                      name="file"
                      id="fileImage"
                      accept="image/jpeg, image/png, image/jpg, image/gif"
                      multiple
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="fileImage"
                      className="flex flex-row items-center justify-center"
                    >
                      <IoIosAddCircleOutline className="w-16 h-16 text-white mr-2" />
                      <h3 className="text-white">Agregar imagen</h3>
                    </label>
                  </div>
                </label>
              </div>
              <div
                className="flex gap-2 mt-4"
                id="preview-containerImage"
              ></div>
            </div>

            <div className="w-6/12 flex flex-col gap-y-5 border border-gray-300 p-4 rounded-md">
              <div className="w-6/12 flex flex-col gap-y-6">
                <label htmlFor="file" className="flex flex-col gap-y-1">
                  <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
                    Video
                  </span>
                  <div className="bg-green-500 hover:bg-green-600 rounded">
                    <input
                      type="file"
                      name="file"
                      id="fileVideo"
                      accept="video/mp4, video/avi, video/mov, video/mkv"
                      multiple
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="fileVideo"
                      className="flex flex-row items-center justify-center"
                    >
                      <IoIosAddCircleOutline className="w-16 h-16 text-white mr-2" />
                      <h3 className="text-white">Agregar video</h3>
                    </label>
                  </div>
                </label>
              </div>
              <div
                className="flex gap-10 mt-4"
                id="preview-containerVideo"
              ></div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          onClick={crearProyecto}
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
