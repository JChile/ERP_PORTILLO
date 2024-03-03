import React from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";



export const RowGastoCampania = ({element}) => {
  return (
    <TableRow>
        <TableCell>{element["date"]}</TableCell>
        <TableCell>{element["month"]}</TableCell>
        <TableCell>{element["day"]}</TableCell>
        <TableCell>{element["spent"]}</TableCell>
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
