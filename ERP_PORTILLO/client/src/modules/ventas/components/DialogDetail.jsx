import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdCancel, MdOutlineSave } from "react-icons/md";

export const DialogDetail = ({ onClose, selectedEvent, isOpen }) => {
  const { tipo, descripcion, end, start, title, asesor, duracion } =
    selectedEvent;

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [originalTitle, setOriginalTitle] = useState(title);

  const [updateDescription, setUpdateDescription] = useState(descripcion);
  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  const [originalDescription, setOriginalDescription] = useState(descripcion);

  const [updateDuration, setUpdateDuration] = useState(duracion);
  const [durationEditMode, setDurationEditMode] = useState(false);
  const [originalDuration, setOriginalDuration] = useState(duracion);

  const [updateDate, setUpdateDate] = useState(start);
  const [dateEditMode, setDateEditMode] = useState(false);
  const [originalDate, setOriginalDate] = useState(start);

  const handleCancelDescription = () => {
    setUpdateDescription(originalDescription);
    setDescriptionEditMode(false);
  };

  const handleCancelTitle = () => {
    setUpdatedTitle(originalTitle);
    setTitleEditMode(false);
  };

  const handleCancelDuration = () => {
    setUpdateDuration(originalDuration);
    setDurationEditMode(false);
  };

  const handleCancelDate = () => {
    setUpdateDate(originalDate);
    setDateEditMode(false);
  };

  console.log({updateDate});

  return (
    <Backdrop open={isOpen}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderRadius: 0,
          },
        }}
      >
        <DialogTitle className="font-bold text-center bg-[#282828] text-white">
          Detalle Evento
        </DialogTitle>
        <DialogContent className="flex flex-col gap-y-2 w-[320px]">
          <div className="flex flex-col gap-y-2 mt-1">
            <div>
              <label className="block my-1 font-semibold text-sm">Título</label>
              <input
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                disabled={!titleEditMode}
                className="border rounded mr-2 p-1 text-sm"
              />
              {!titleEditMode ? (
                <button onClick={() => setTitleEditMode(true)}>
                  <GrUpdate size={12} color="green" />
                </button>
              ) : (
                <div className="gap-x-2 inline-block">
                  <button
                    className="mx-1"
                    onClick={() => setTitleEditMode(false)}
                  >
                    <MdOutlineSave size={16} color="green" />
                  </button>
                  <button className="mx-1" onClick={handleCancelTitle}>
                    <MdCancel size={16} color="red" />
                  </button>
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">Asesor</p>
              <p className="text-sm border rounded p-1 bg-slate-50">
                {asesor.first_name === "" ? "-" : asesor.first_name}
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">Categoría</p>
              <p className="text-sm border rounded p-1 bg-slate-50">
                {tipo.nombre}
              </p>
            </div>
            <div>
              <label className="block my-1 font-semibold text-sm">
                Descripción
              </label>
              <div className="flex">
                <textarea
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  disabled={!descriptionEditMode}
                  className="border rounded mr-2 p-1 text-sm"
                  rows={3}
                  cols={23}
                />
                {!descriptionEditMode ? (
                  <button
                    onClick={() => setDescriptionEditMode(true)}
                    className="my-auto"
                  >
                    <GrUpdate size={12} color="green" />
                  </button>
                ) : (
                  <div className="flex gap-x-2 ">
                    <button
                      className="mx-1"
                      onClick={() => setDescriptionEditMode(false)}
                    >
                      <MdOutlineSave size={16} color="green" />
                    </button>
                    <button className="mx-1" onClick={handleCancelDescription}>
                      <MdCancel size={16} color="red" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm">
              <label className="font-semibold">Fecha de inicio</label>
              <div className="flex">
                <input
                  className="rounded border p-1 text-sm mr-2"
                  type="datetime-local"
                  disabled={!dateEditMode}
                  value={updateDate.toISOString().slice(0, 16)}
                  onChange={(e) => setUpdateDate(new Date(e.target.value))}
                />
                {!dateEditMode ? (
                  <button
                    onClick={() => setDateEditMode(true)}
                    className="my-auto"
                  >
                    <GrUpdate size={12} color="green" />
                  </button>
                ) : (
                  <div className="flex gap-x-2 ">
                    <button
                      className="mx-1"
                      onClick={() => setDateEditMode(false)}
                    >
                      <MdOutlineSave size={16} color="green" />
                    </button>
                    <button className="mx-1" onClick={handleCancelDate}>
                      <MdCancel size={16} color="red" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm">
              <label className="font-semibold block">Duracion</label>
              <div className="flex">
                <input
                  className="rounded border p-1 text-sm mr-2"
                  type="number"
                  disabled={!durationEditMode}
                  value={updateDuration}
                  onChange={(e) => setUpdateDuration(e.target.value)}
                />
                {!durationEditMode ? (
                  <button
                    onClick={() => setDurationEditMode(true)}
                    className="my-auto"
                  >
                    <GrUpdate size={12} color="green" />
                  </button>
                ) : (
                  <div className="flex gap-x-2 ">
                    <button
                      className="mx-1"
                      onClick={() => setDurationEditMode(false)}
                    >
                      <MdOutlineSave size={16} color="green" />
                    </button>
                    <button className="mx-1" onClick={handleCancelDuration}>
                      <MdCancel size={16} color="red" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-sm">
              <label className="font-semibold text-sm">Objeciones</label>
              <ul>
                <li>No le gusta la tarea 1</li>
                <li>No le gusta la tarea 2</li>
                <li>No le gusta la tarea 3</li>
                <li>No le gusta la tarea 4</li>
              </ul>
            </div>

          </div>
        </DialogContent>
        <DialogActions className="bg-dark-purple" sx={{}}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              textTransform: "capitalize",
              borderRadius: "0px",
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};
