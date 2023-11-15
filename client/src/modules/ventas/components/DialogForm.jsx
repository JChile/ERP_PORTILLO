import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  TextField,
  Select,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";

export const DialogForm = ({ isOpen, categories, onSave, onClose }) => {
  const initialFormValues = {
    title: "",
    category: categories[0].id,
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  };

  const [formValues, setFormValues] = useState({ ...initialFormValues });

  useEffect(() => {
    if (isOpen) {
      setFormValues({ ...initialFormValues });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formValues);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="text-black font-bold">
        Registrar Evento
      </DialogTitle>
      <DialogContent sx={{ maxWidth: "500px" }}>
        <FormControl
          className="flex flex-col gap-y-4"
          sx={{ marginTop: "10px" }}
        >
          <TextField
            type="text"
            name="title"
            label="Título"
            value={formValues.title}
            onChange={handleInputChange}
            variant="filled"
          />
          <Select
            name="category"
            label="Categoría"
            value={formValues.category}
            onChange={handleInputChange}
            variant="filled"
          >
            {categories.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
          <TextField
            name="description"
            label="Descripción"
            placeholder="Descripción"
            multiline
            rows={2}
            variant="filled"
            value={formValues.description}
            onChange={handleInputChange}
            sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <TextField
            name="date"
            type="date"
            label="Fecha"
            value={formValues.date}
            onChange={handleInputChange}
            variant="filled"
            placeholder=""
          />
          <TextField
            name="startTime"
            type="time"
            label="Hora de inicio"
            value={formValues.startTime}
            onChange={handleInputChange}
            variant="filled"
            placeholder=""
            
          />
          <TextField
            name="endTime"
            type="time"
            label="Hora de fin"
            value={formValues.endTime}
            onChange={handleInputChange}
            variant="filled"
            placeholder=""
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ backgroundColor: "blue", color: "white" }}
          onClick={onClose}
        >
          Cerrar
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
