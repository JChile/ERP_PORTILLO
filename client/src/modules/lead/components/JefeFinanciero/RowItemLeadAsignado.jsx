import React from "react"
import { Checkbox, TableCell, TableRow } from "@mui/material"
import { CustomMoreVerticalActions } from "../../../../components"
import { useNavigate, Link } from "react-router-dom"
import { formatDate_ISO861_to_formatdate } from "../../../../utils"
import { FaCalendarAlt, FaWhatsapp } from "react-icons/fa"
import { IoIosCall } from "react-icons/io"

const RowItemLeadAsignado = ({ item, checkedElement }) => {
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
          onChange={(e) => checkedElement(e, item.id)}
          inputProps={{ "aria-label": "controlled" }}
        />
        <CustomMoreVerticalActions
          activeOnDelete={false}
          activeOnActive={false}
          onEdit={onEditItemSelected}
        />
      </TableCell>
      <TableCell>
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "blue"
            e.target.style.fontWeight = "bold"
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "black"
            e.target.style.fontWeight = "normal"
          }}
          to={`/lead/detail/${item.id}`}
        >
          {item.celular}
        </Link>
      </TableCell>
      <TableCell>{`${item.nombre} ${item.apellido}`}</TableCell>
      <TableCell>{proyecto["nombre"]}</TableCell>
      <TableCell>{campania["nombre"]}</TableCell>
      <TableCell align="center">
        <span style={{ backgroundColor: estadoLead["color"] }} className={`inline-block px-2 py-1 text-sm font-semibold leading-none rounded-full text-white`}>
          {estadoLead["nombre"]}
        </span>
      </TableCell>
      <TableCell>
        {item["estadoSeparacionLead"] ? item["estadoSeparacionLead"]["nombre"] : "No"}
      </TableCell>
      <TableCell>
        {item["asesor"]["first_name"]} {item["asesor"]["last_name"]}
      </TableCell>
      <TableCell>
          <div className="flex gap-x-2 gap-y-1 justify-center">
            <FaWhatsapp />
            <span>{item["numWhatsapps"]}</span>
          </div>
          <div className="flex gap-x-2 gap-y-1 justify-center">
            <IoIosCall />
            <span>{item["numLlamandas"]}</span>
          </div>
          <div className="flex gap-x-2 gap-y-1 justify-center">
            <FaCalendarAlt />
            <span>{item["numEventos"]}</span>
          </div>
        </TableCell>
      <TableCell>
        {formatDate_ISO861_to_formatdate(item["fecha_asignacion"])}
      </TableCell>
    </TableRow>
  )
}

export default RowItemLeadAsignado
