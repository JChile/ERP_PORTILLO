import React, { useRef, useState } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import { BoxOptionsImportLeads, BoxValidateImportLeads } from "../components";
import * as XLSX from "xlsx/xlsx.mjs";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { useAlertMUI } from "../../../hooks";
import { combinarErrores } from "../../../utils";
import { MdDeleteForever } from "react-icons/md";
import {
  importLeadsModeAutomatic,
  importLeadsModeManual,
  validateImportLeads,
} from "../helpers";

export const AddLeadSheet = () => {
  // referencia al archivo
  const fileInputRef = useRef(null);
  // estado que controla si se subio o no un archivo
  const [selectedFile, setSelectedFile] = useState(null);
  // toda la data exportada del excel
  const [dataImport, setDataImport] = useState([]);
  // data de errores
  const [errorsImport, setErrorsImport] = useState([]);

  const [showOptions, setShowOptions] = useState(false);
  const [showDialogErrors, setShowDialogErrors] = useState(false);

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

  // cada vez que se importa un archivo se ejecuta la funcion onload
  const handleFileUpload = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = (event) => {
        setSelectedFile(reader.result);
      };
      reader.onerror = () => {
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: "Error al leer el archivo",
        });
        handleClickFeedback();
      };
    } else {
      setSelectedFile(null);
    }
  };

  // resetFileInput
  const resetFileInput = () => {
    fileInputRef.current.value = "";
    setSelectedFile(null);
  };

  // mostrar dialogo de errores
  const onShowDialogErrors = () => {
    setShowDialogErrors(true);
  };

  // cerrar dialogo de errores
  const onCloseDialogErrors = () => {
    setShowDialogErrors(false);
    limpiarDataImportacion();
  };

  // limpiar data de importacion
  const limpiarDataImportacion = () => {
    setErrorsImport([]);
    setDataImport([]);
  };

  // mostrar opciones de importacion
  const onShowOptions = () => {
    setShowOptions(true);
  };

  // cerrar opciones de importación
  const onCloseOptions = () => {
    setShowOptions(false);
  };

  // funcion para encontrar numeros repetidos
  function encontrarNumerosRepetidos(dataDeImportacion) {
    const numerosRepetidos = {};

    // Recorrer la data de importación
    dataDeImportacion.forEach((item, index) => {
      const celular = item.celular;

      if (celular) {
        if (numerosRepetidos[celular]) {
          numerosRepetidos[celular].push(index);
        } else {
          numerosRepetidos[celular] = [index];
        }
      }
    });

    let mensaje = "";

    // Crear mensaje con saltos de línea para números repetidos
    for (const celular in numerosRepetidos) {
      if (numerosRepetidos[celular].length > 1) {
        mensaje += `El número ${celular} se repite en la data de importación.\n`;
      }
    }

    return mensaje;
  }

  const handleValidateImportClick = async (desde, hasta, proyecto) => {
    // primero leemos el excel
    const workbook = XLSX.read(selectedFile, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Obtén los datos como arreglo de objetos, comenzando desde la fila 6 (skipHeaderRows: 5)
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
    });
    const jsonDataRange = jsonData.slice(
      parseInt(desde, 10) - 2,
      parseInt(hasta, 10) - 1
    );
    // guardamos la data a importar
    setDataImport(jsonDataRange);

    const advertenciasRepetidos = encontrarNumerosRepetidos(jsonDataRange);
    if (advertenciasRepetidos.length !== 0) {
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: advertenciasRepetidos,
      });
      handleClickFeedback();
    } else {
      setFeedbackMessages({
        style_message: "success",
        feedback_description_error: "No hay celulares repetidos",
      });
      handleClickFeedback();
    }

    const dataImportValidate = {
      proyecto_id: proyecto,
      data: jsonDataRange,
    };
    // enviamos la data al backend para que sea validada
    try {
      const result = await validateImportLeads(dataImportValidate);
      // guardamos los errores
      setErrorsImport(result.inadecuado);
    } catch (error) {
      const pilaError = combinarErrores(error);
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
  };

  // mostrar cuadro de opciones
  const onShowOptionsImport = () => {
    if (!selectedFile) {
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: "No has cargado ningún archivo",
      });
      handleClickFeedback();
    } else {
      onShowOptions();
    }
  };

  // revisar importacion de archivo
  const onValidateImportFileLeads = (options) => {
    console.log(options);
    const { rangoDesde, rangoHasta, proyecto } = options;
    // cerramos dialogo de opciones
    onCloseOptions();
    // mostramos carga
    setVisibleProgress(true);
    // validamos la importación
    handleValidateImportClick(rangoDesde, rangoHasta, proyecto);
    // ocultamos carga
    setVisibleProgress(false);
    // abrimos dialogo de errores
    onShowDialogErrors();
  };

  function compararCelular(item, errorItem) {
    return item.celular === errorItem.data.celular;
  }

  // importar archivo
  const onImportFileLeads = async (esAutomatico, esConErrores) => {
    // cerramos cuadro de dialogo de errores
    onCloseDialogErrors();
    // mostramos loading
    setVisibleProgress(true);
    // mandamos la información al backend
    let dataImportAux = dataImport;
    if (!esConErrores) {
      dataImportAux = dataImport.filter((item) => {
        return !errorsImport.some((errorItem) =>
          compararCelular(item, errorItem)
        );
      });
    }

    console.log(dataImportAux);

    if (esAutomatico) {
      try {
        const result = await importLeadsModeAutomatic(dataImportAux);
        console.log(result);
      } catch (error) {
        const pilaError = combinarErrores(error);
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error:
            "Error en la importacion con asignacion automatica: \n" + pilaError,
        });
        handleClickFeedback();
      }
    } else {
      try {
        const result = await importLeadsModeManual(dataImportAux);
        console.log(result);
      } catch (error) {
        const pilaError = combinarErrores(error);
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error:
            "Error en la importacion con asignacion manual: \n" + pilaError,
        });
        handleClickFeedback();
      }
    }
    // limpiamos las variables de importacion
    limpiarDataImportacion();
    // borramos el archivo de importacion
    resetFileInput();
    // ocultamos loading
    setVisibleProgress(false);
  };

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5 h-min-screen">
        <h1 className="text-lg font-bold">Importacion automatica</h1>
        <hr className="my-4"></hr>
        <div className="h-min-screen flex flex-col justify-center items-center">
          <div className="mb-5 flex items-center">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              ref={fileInputRef}
              className="mx-auto"
            />
            {selectedFile && (
              <button onClick={resetFileInput} className="ml-2">
                <MdDeleteForever
                  size={40}
                  color="red"
                  className="text-red-600"
                />
                {/* Icono de eliminación */}
              </button>
            )}
          </div>

          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={onShowOptionsImport}
            >
              Importar
            </button>
          </div>
          <pre>{JSON.stringify(dataImport, null, 2)}</pre>
        </div>
      </div>
      {/* DIALOGO DE OPCIONES */}
      {showOptions && (
        <BoxOptionsImportLeads
          onClose={onCloseOptions}
          onValidateImportFileLeads={onValidateImportFileLeads}
        />
      )}

      {/* DIALOGO DE ERRORES */}
      {showDialogErrors && (
        <BoxValidateImportLeads
          onClose={onCloseDialogErrors}
          onImportLeads={onImportFileLeads}
          errors={errorsImport}
        />
      )}

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
