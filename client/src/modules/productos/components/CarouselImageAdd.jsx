import React, { useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IoIosAddCircleOutline } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import { MdDeleteForever } from "react-icons/md";
import { deleteImagenProducto } from "../helpers";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const CarouselComponentImageAdd = ({
  images,
  handleFileSelect,
  obtenerProducto,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const carouselRef = useRef(null);

  const onDeleteItemSelected = async (idItem) => {
    setSelectedItemToDelete(idItem);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deleteImagenProducto(selectedItemToDelete);
      console.log("Eliminando imagen: " + selectedItemToDelete);
      obtenerProducto();
      setCurrentIndex(0);
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };

  const carouselItems = images.map((imagen) => (
    <div key={imagen.id}>
      <img
        src={import.meta.env.VITE_BACKEND_URL + imagen.imagen}
        alt={`image ${imagen.id}`}
        className="w-64 h-64 p-2"
      />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full bg-red-500">
        <IconButton
          size="medium"
          onClick={() => onDeleteItemSelected(imagen.id)}
        >
          <MdDeleteForever color="white" />
        </IconButton>
      </div>
    </div>
  ));

  return (
    <>
      <Carousel
        className="w-64 h-64"
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={false}
        transitionTime={500}
        showArrows={true}
        showIndicators={true}
        selectedItem={currentIndex}
        onChange={(_, newIndex) => setCurrentIndex(newIndex)}
        ref={carouselRef}
      >
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
          <label htmlFor="fileImage">
            <IoIosAddCircleOutline className="w-full h-full" color="white" />
          </label>
        </div>
        {carouselItems}
      </Carousel>

      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Alerta de eliminación de imagen"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`¿Quiere eliminar esta imagen?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="inherit"
            onClick={handleDeleteDialogClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirmation}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CarouselComponentImageAdd;
