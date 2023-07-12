import React from "react";
import "./rolItem.css";
import EditIcon from "../../../../assets/edit-icon.svg";

const RolItem = ({ item }) => {
  return (
    <div className="rol_item">
      <h3>{item.name}</h3>
      <img src={EditIcon} alt="edit" />
    </div>
  );
};

export default RolItem;
