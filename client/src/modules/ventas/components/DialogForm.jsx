import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "../hooks";

export const DialogForm = ({ isOpen, categories, onClose, onSave }) => {
  const { form, handleChangeForm, handleSubmit } = useForm({
    title: "",
    category: categories[0].id,
    description: "",
    date: "",
    startTime: "",
    duration: 0,
  });

  const { title, category, description, date, startTime, duration } = form;

  const handleSave = (event) => {
    handleSubmit(event)
    onClose();
    onSave(form)
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="text-black font-bold text-center">
        Registrar Evento
      </DialogTitle>
      <DialogContent className="flex flex-col gap-y-2 w-[320px]">
        <form className="flex flex-col gap-y-4 mt-1">
          <input
            className="border-none bg-gray-200"
            type="text"
            name="title"
            label="Título"
            placeholder="Titulo del evento"
            value={title}
            onChange={handleChangeForm}
          />
          <select
            className="border-none bg-gray-200"
            name="category"
            label="Categoría"
            value={category}
            onChange={handleChangeForm}
            variant="filled"
          >
            {categories.map((item) => (
              <option
                className="my-2 bg-white rounded-none"
                value={item.id}
                key={item.id}
              >
                {item.text}
              </option>
            ))}
          </select>
          <textarea
            className="border-none bg-gray-200"
            name="description"
            label="Descripción"
            placeholder="Descripción"
            rows="2"
            value={description}
            onChange={handleChangeForm}
          />
          <input
            className="border-none bg-gray-200"
            name="date"
            type="date"
            label="Fecha"
            value={date}
            onChange={handleChangeForm}
          />
          <div className="flex gap-x-4">
            <input
              className="border-none bg-gray-200"
              name="startTime"
              type="time"
              label="Hora de inicio"
              value={startTime}
              onChange={handleChangeForm}
            />
            <input
              className="border-none bg-gray-200 w-28"
              name="duration"
              type="number"
              label="Hora de inicio"
              placeholder="Duración"
              value={duration}
              onChange={handleChangeForm}
            />
          </div>
        </form>

        <div className="flex flex-row gap-x-2 my-1 justify-end">
          <button
            className="px-2 py-1 bg-red-800 text-white rounded w-20 hover:bg-red-600"
            onClick={onClose}
          >
            Cerrar
          </button>
          <button
            className="px-2 py-1 bg-green-800 text-white rounded w-20 hover:bg-green-600"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
