import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

const CustomCard = ({
  id,
  nombre,
  descripcion,
  ubicacion,
  fecha_actualizacion,
}) => {
  const fecha = new Date(fecha_actualizacion);
  const navigate = useNavigate();
  const descripcionFormat = descripcion ? descripcion : "Sin descripción";
  const ubicacionFormat = ubicacion ? ubicacion : "Sin ubicación";
  return (
    <Card
      sx={{
        borderRadius: 0,
        backgroundColor: "ButtonShadow",
        maxWidth: 280,
      }}
    >
      <CardMedia
        title="campania"
        sx={{ height: 140 }}
        image="https://i.redd.it/more-photos-of-rms-campanias-library-v0-6p2sideaswta1.jpg?width=3016&format=pjpg&auto=webp&s=c6c8060e04036382c79b65125ee10d714dd60086"
      />
      <CardContent>
        <h6 className="capitalize">{nombre}</h6>
        <p className="text-gray-800 text-sm">{descripcionFormat}</p>
        <p className="text-gray-800 text-xs">{ubicacionFormat}</p>
        <p className="text-gray-500 text-sm">
          Modificado:
          {` ${fecha.getDay()}\\${fecha.getMonth()}\\${fecha.getFullYear()}`}
        </p>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          sx={{
            textTransform: "capitalize",
            borderRadius: 0,
            backgroundColor: "GrayText",
          }}
          onClick={() => navigate(`/lead/proyecto/${id}`)}
        >
          Detalle
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
