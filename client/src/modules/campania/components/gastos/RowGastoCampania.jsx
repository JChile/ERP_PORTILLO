import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { formatDate_ISO861_to_formatOnlyDate } from '../../../../utils';
import { DialogDeleteGastoCampania } from './DialogDeleteGastoCampania';
import { DialogUpdateGastoCampania } from './DialogUpdateGastoCampania';

export const RowGastoCampania = ({ element, onEditGastoCampania, onDeleteGastoCampania, onUpdateGastoCampania }) => {
  const { fechaGasto } = element
  return (
    <TableRow>
      <TableCell>{formatDate_ISO861_to_formatOnlyDate(fechaGasto)}</TableCell>
      <TableCell>S/ {element["tipoCambioSoles"]}</TableCell>
      <TableCell>S/ {element["gastoSoles"]}</TableCell>
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