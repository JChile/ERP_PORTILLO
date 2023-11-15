import React from "react";

export const CustomEventWrapper = (props) => {
  // Aquí puedes personalizar la envoltura de eventos según tus necesidades
  const { event, children, onSelectEvent } = props;


  const eventStyle = {
    backgroundColor: event.category.color,
    opacity: "0.9",
    padding: "1px",
    borderRadius: "5px",
  };

  return (
    <div onClick={() => onSelectEvent(event)} style={eventStyle}>
      {children}
    </div>
  );
};
