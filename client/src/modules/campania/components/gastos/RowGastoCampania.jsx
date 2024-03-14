import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { formatDate_ISO861_to_formatOnlyDate } from '../../../../utils';

export const RowGastoCampania = ({ element, onEditGastoCampania, onDeleteGastoCampania }) => {
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
          <DialogUpdateGastoCampania data={element} handleConfirm={onEditGastoCampania} />
          <DialogDeleteGastoCampania data={element} handleConfirm={onDeleteGastoCampania} />
        </div>
      </TableCell>
    </TableRow>
  )
}

// DIALOGO UPDATE GASTO CAMPAÑA
const DialogUpdateGastoCampania = ({ data, handleConfirm }) => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <IconButton color='warning' variant='contained' onClick={handleClickOpen}>
        <FiEdit2 />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          className="flex justify-between items-center"
          style={{ background: "#9E154A", color: "#fff" }}
        >
          Confirmación de edición
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    </div>
  )
}

// DIALOGO DELETE GASTO CAMPAÑA
const DialogDeleteGastoCampania = ({ data, handleConfirm }) => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleFormSubmit = () => {
    handleConfirm(data.id)
    handleClose()
  }

  return (
    <div>
      <IconButton color='error' variant='contained' onClick={handleClickOpen}>
        <FiTrash2 />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          className="flex justify-between items-center"
          style={{ background: "#9E154A", color: "#fff" }}
        >
          Confirmación de eliminación
        </DialogTitle>
        <DialogContent>
          <Typography className='pt-3'>
            ¿Estas seguro de eliminar este registro?
          </Typography>
          <Typography>
            <span className='font-bold'>Fecha de registro: </span>
            {formatDate_ISO861_to_formatOnlyDate(data["fechaGasto"])}
          </Typography>

        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleFormSubmit} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}