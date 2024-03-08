import React from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { formatDate_ISO861_to_formatOnlyDate } from '../../../../utils';

export const RowGastoCampania = ({element}) => {
  const {fechaGasto} = element
  const fechaParser = new Date(fechaGasto)
  const month = fechaParser.getMonth() + 1
  const monthParser = month < 10 ? '0' + month : month
  const day = fechaParser.getDate();

  return (
    <TableRow>
        <TableCell>{formatDate_ISO861_to_formatOnlyDate(element["fechaGasto"])}</TableCell>
        <TableCell>{monthParser}</TableCell>
        <TableCell>{day}</TableCell>
        <TableCell>$ {element["gastoDolares"]}</TableCell>
        <TableCell>
          <div className='flex'>
            <IconButton color='warning'>
              <FiEdit2 />
            </IconButton>
            <IconButton color='error'>
              <FiTrash2 />
            </IconButton>
          </div>
        </TableCell>
    </TableRow>
  )
}
