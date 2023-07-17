import React from "react";
import "./rolItem.css";

const RolItem = ({ item }) => {
  return (
    <div className="rol_item">
      <h3>{item.name}</h3>
    </div>
  );
};

export default RolItem;
