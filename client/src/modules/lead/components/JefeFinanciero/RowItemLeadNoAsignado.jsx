import React from "react"
import { Checkbox, TableCell, TableRow } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { CustomMoreVerticalActions } from "../../../../components"
import { formatDate_ISO861_to_formatdate } from "../../../../utils"
import { FaEdit } from "react-icons/fa"

export const RowItemLeadNoAsignado = ({ item, checkedElement }) => {
  const { id, campania, estadoLead } = item
  const { proyecto } = campania

  const navigate = useNavigate()

  const onEditItemSelected = () => {
    navigate(`/lead/update/${id}`)
  }

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={item["isSelected"]}
          onChange={(e) => {
            checkedElement(e, item.id)
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
        <FaEdit className="inline-block mx-1 cursor-pointer shadow-lg hover:shadow-blue-900" size={16} color="blue" onClick={onEditItemSelected}/>
      </TableCell>
      <TableCell>
        <Link
          to={`/lead/detail/${item["id"]}`}
          style={{
            textDecoration: "none",
            color: "black",
            transition: "color 0.3s", // Add a smooth transition effect
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "blue"
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "black"
          }}
        >
          <div className="flex flex-col gap-y-2">
            <span>{item["celular"]}</span>
          </div>
        </Link>
      </TableCell>
      <TableCell>{`${item["nombre"]} ${item["apellido"]}`}</TableCell>
      <TableCell>{proyecto["nombre"]}</TableCell>
      <TableCell>{campania["nombre"]}</TableCell>
      <TableCell align="center">
        <span style={{ backgroundColor: estadoLead["color"] }} className={`inline-block px-2 py-1 text-sm font-semibold leading-none rounded-full text-white`}>
          {estadoLead["nombre"]}
        </span>
      </TableCell>
      <TableCell>
        {item["penultimo_asesor"]["first_name"]}{" "}
        {item["penultimo_asesor"]["last_name"]}
      </TableCell>
      <TableCell>
        {formatDate_ISO861_to_formatdate(item["fecha_desasignacion"])}
      </TableCell>
    </TableRow>
  )
}
