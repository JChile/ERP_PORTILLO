import React from "react";

export const CustomEvent = (props) => {
  const { event } = props

  console.log(event)
  const eventStyle = {
    whiteSpace: "normal", // Esto permite que el texto se envuelva y pase a la siguiente línea
  };

  return (
    <div className="text-sm font-semibold" style={eventStyle} >
      {`${event.title} (${event.tipo})`}
    </div>
  );
};
