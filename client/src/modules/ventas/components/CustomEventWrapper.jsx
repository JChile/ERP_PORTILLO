import React from "react";

export const CustomEventWrapper = (props) => {
  const { event, children, onSelectEvent } = props;
  const {tipo} = event
  const eventStyle = {
    backgroundColor: `${tipo.color}`,
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
