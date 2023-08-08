import React from "react";

import * as Icons from "react-icons/md";
const DynamicIcon = ({ name, ...props }) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    // Si el icono no existe, muestra un mensaje de error
    return <span>Icono no encontrado</span>;
  }

  return <IconComponent {...props} size={30} />;
};

export default DynamicIcon;
