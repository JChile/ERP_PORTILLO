import React from "react";
import "./rolItem.css";

const RolItem = (props) => {
  const { name } = props;

  return (
    <div className="rol_item">
      <h3>{name}</h3>
      <img alt="edit" />
    </div>
  );
};

export default RolItem;
