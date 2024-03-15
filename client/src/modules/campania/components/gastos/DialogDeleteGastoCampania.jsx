import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { formatDate_ISO861_to_formatOnlyDate } from '../../../../utils'

export const DialogDeleteGastoCampania = ({ data, handleConfirm }) => {
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
