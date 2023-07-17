import React, { useState, useEffect } from "react";
import RolItem from "./components/RolItem";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { getRoles } from "./helpers/getRoles";

const ListRol = () => {
  const [openForm, setOpenForm] = useState(false);
  const [newItemForm, setNewItemForm] = useState({ itemName: "" });
  const [itemList, setItemList] = useState([]);
  /**
   * Inicia cerrar el dialog para crear un nuevo rol
   */
  const handleOpenCreateDialog = () => setOpenForm((prev) => !prev);

  const handleChangeNewItemForm = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setNewItemForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSaveItemDialog = (event) => {
    event.preventDefault();
    if (newItemForm.itemName) {
      console.log(newItemForm.itemName);
      setItemList({ items: [...itemList.items, newItemForm.itemName] });
      handleOpenCreateDialog();
      setNewItemForm({ itemName: "" });
    } else {
      console.log("Complete los campos.");
    }
  };

  const obtenerRoles = async () => {
    const result = await getRoles();
    setItemList(result);
  };

  useEffect(() => {
    obtenerRoles();
  }, []);

  return (
    <div className="flex flex-col gap-y-6 items-center">
      <h1 className="text-center font-semibold text-2xl">Gestión de Roles</h1>
      <div className="w-4/5  max-w-screen-sm">
        {/* por ahora esta asi. */}
        {/* <Link to="/rrhh/roles/create"> */}
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={handleOpenCreateDialog}
        >
          Agregar rol
        </Button>
        {/* </Link> */}
      </div>
      <div className="w-4/5 max-w-screen-sm flex flex-col gap-y-4">
        {itemList.map((item) => (
          <RolItem key={item.id} item={item} />
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={openForm} onClose={handleOpenCreateDialog}>
        <DialogTitle>Registrar nuevo rol</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, completa el siguiente campo con el nombre del rol que
            desea crear. Recuerda que el campo no puede estar vacío y solo se
            aceptan caracteres alfabéticos.
          </DialogContentText>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="itemName"
              name="itemName"
              value={newItemForm.itemName}
              onChange={handleChangeNewItemForm}
              label="Nuevo rol"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpenCreateDialog}>Cancel</Button>
            <Button onClick={handleSaveItemDialog}>Guardar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Dialog actualizar*/}
      <Dialog open={openForm} onClose={handleOpenCreateDialog}>
        <DialogTitle>Actualizar rol</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, completa el siguiente campo con el nuevo nombre del rol
            que desea crear. Recuerda que el campo no puede estar vacío y solo
            se aceptan caracteres alfabéticos.
          </DialogContentText>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="itemName"
              name="itemName"
              value={newItemForm.itemName}
              onChange={handleChangeNewItemForm}
              label="Nuevo rol"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpenCreateDialog}>Cancel</Button>
            <Button onClick={handleSaveItemDialog}>Guardar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListRol;
