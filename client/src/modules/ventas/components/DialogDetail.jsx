import { Backdrop, Dialog, DialogContent, DialogTitle } from "@mui/material";

export const DialogDetail = ({ onClose, selectedEvent, isOpen }) => {
  const { category, description, end, start, title } = selectedEvent;

  //console.log(selectedEvent);

  return (
    <Backdrop open={isOpen}>
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="text-black font-bold text-center">
        Detalle Evento
      </DialogTitle>
      <DialogContent className="flex flex-col gap-y-2 w-[320px]">
        <div className="flex flex-col gap-y-4 mt-1">
          <div>
            <p className="font-semibold">Título:</p>
            <p>{title}</p>
          </div>
          <div>
            <p className="font-semibold">Categoría:</p>
            <p>{JSON.stringify(category)}</p>
          </div>
          <div>
            <p className="font-semibold">Descripción:</p>
            <p>{description}</p>
          </div>
          <div>
            <p className="font-semibold">Fecha de inicio:</p>
            <p>{start.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">Fecha de fin:</p>
            <p>{end.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex flex-row gap-x-2 my-1 justify-end">
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded w-20 hover:bg-blue-800"
            onClick={onClose}
          >
            Aceptar
          </button>
        </div>
      </DialogContent>
    </Dialog>
    </Backdrop>
  );
};
