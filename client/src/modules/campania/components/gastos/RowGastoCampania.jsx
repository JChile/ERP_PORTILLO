import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { formatDate_ISO861_to_formatOnlyDate } from '../../../../utils';
import { DialogDeleteGastoCampania } from './DialogDeleteGastoCampania';
import { DialogUpdateGastoCampania } from './DialogUpdateGastoCampania';

export const RowGastoCampania = ({ element, onEditGastoCampania, onDeleteGastoCampania, onUpdateGastoCampania }) => {
  const { fechaGasto } = element
  const fechaParser = new Date(fechaGasto + "T00:00:00Z")
  const month = fechaParser.getUTCMonth() + 1
  const monthParser = month < 10 ? '0' + month : month
  const day = fechaParser.getUTCDate();

  return (
    <TableRow>
      <TableCell>{formatDate_ISO861_to_formatOnlyDate(fechaGasto)}</TableCell>
      <TableCell>{monthParser}</TableCell>
      <TableCell>{day}</TableCell>
      <TableCell>$ {element["gastoDolares"]}</TableCell>
      <TableCell>
        <div className='flex'>
          <DialogUpdateGastoCampania
            data={element}
            handleConfirm={onUpdateGastoCampania}
          />
          <DialogDeleteGastoCampania
            data={element}
            handleConfirm={onDeleteGastoCampania}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}