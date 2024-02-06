import React from "react";
import iconLead from "../../assets/icons/lead.png";
import iconCampania from "../../assets/icons/campania.png";
import iconEvento from "../../assets/icons/evento.png";
import iconUsuario from "../../assets/icons/usuario.png";
import iconProyecto from "../../assets/icons/proyecto.png";
import iconRol from "../../assets/icons/rol.png";
import iconProducto from "../../assets/icons/producto.png";

export const DynamicIcon = ({ iconName }) => {
  const getIconByName = (name) => {
    switch (name) {
      case "usuario":
        return iconUsuario;
      case "rol":
        return iconRol;
      case "lead":
        return iconLead;
      case "campania":
        return iconCampania;
      case "evento":
        return iconEvento;
      case "producto":
        return iconProducto;
      case "proyecto":
        return iconProyecto;
      default:
        return null; // Puedes devolver un icono por defecto o null si no hay coincidencia
    }
  };

  const iconSrc = getIconByName(iconName);

  return (
    <img
      src={iconSrc}
      alt={iconName}
      style={{
        minWidth: 0,
        width: 30,
        justifyContent: "center",
      }}
    />
  );
};
