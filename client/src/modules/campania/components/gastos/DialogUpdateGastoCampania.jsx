import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { IoIosAlert } from 'react-icons/io'
import { CustomDatePicker } from '../../../../components'

export const DialogUpdateGastoCampania = ({ handleConfirm, data }) => {
    const [open, setOpen] = useState(false)
    const [alertDolar, setAlertDolar] = useState(false)
    const [alertSol, setAlertSol] = useState(false)
    const [alertFecha, setAlertFecha] = useState(false)
    const [gasto, setgasto] = useState({
        campania: data["campania"],
        presupuestoProyecto: data["presupuestoProyecto"],
        gastoSoles: data["gastoSoles"],
        gastoDolares: data["gastoDolares"],
        fechaGasto: data["fechaGasto"],
        tipoCambio: data["tipoCambioSoles"]
    });

    const {
        gastoSoles,
        gastoDolares,
        fechaGasto,
        tipoCambio
    } = gasto;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let newValue = value;

        if (isNaN(value) || value < 0 || value === "") {
            setAlertSol(true);
            setAlertDolar(true);
        } else {
            setAlertSol(false);
            setAlertDolar(false);
        }
        if (name === "gastoSoles") {
            newValue = parseFloat((parseFloat(value) / tipoCambio).toFixed(2));

        } else if (name === "gastoDolares") {
            newValue = parseFloat((parseFloat(value) * tipoCambio).toFixed(2));
        }

        setgasto({
            ...gasto,
            [name]: value,
            // Actualiza el otro campo en tiempo real
            ...(name === "gastoSoles"
                ? { gastoDolares: newValue }
                : { gastoSoles: newValue }),
        });
    };

    const handleFecha = (newDate) => {
        if (newDate != "") {
            setAlertFecha(false);
        }
        setgasto({
            ...gasto,
            fechaGasto: newDate,
        });
    };

    const validateData = () =>
        gastoSoles > 0 && gastoDolares > 0 && fechaGasto !== "";

    const handleFormSubmit = () => {
        if (validateData()) {
            handleConfirm(data["id"], gasto);
            handleClose();
        } else {
            setAlertSol(gastoSoles <= 0);
            setAlertDolar(gastoDolares <= 0);
            setAlertFecha(fechaGasto === "");
        }
    };

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
                    <span>Registrar gasto </span>
                    <span style={{ fontSize: 13, opacity: 0.7 }}>
                        (Tipo cambio hoy: {tipoCambio})
                    </span>
                </DialogTitle>
                <DialogContent>
                    <form>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel htmlFor="gastoSoles">
                                Gasto en Soles
                            </InputLabel>
                            <OutlinedInput
                                id="gastoSoles"
                                name="gastoSoles"
                                type="number" // Cambia esto según el tipo correcto de tu dato
                                value={gastoSoles}
                                onChange={handleInputChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {alertSol && (
                                            <IoIosAlert
                                                style={{ color: "#d32f2f", fontSize: "2rem" }}
                                            />
                                        )}
                                    </InputAdornment>
                                }
                                label="gasto en Soles"
                            />
                        </FormControl>

                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel htmlFor="gastoDolares">
                                Gasto en Dólares
                            </InputLabel>
                            <OutlinedInput
                                id="gastoDolares"
                                name="gastoDolares"
                                type="number" // Cambia esto según el tipo correcto de tu dato
                                value={gastoDolares}
                                onChange={handleInputChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {alertDolar && (
                                            <IoIosAlert
                                                style={{ color: "#d32f2f", fontSize: "2rem" }}
                                            />
                                        )}
                                    </InputAdornment>
                                }
                                label="gasto en Dólares"
                            />
                        </FormControl>

                        <label className="flex flex-col gap-y-1">
                            <span className=" block text-sm">Fecha de registro</span>
                            <div className="flex flex-row items-center">
                                <CustomDatePicker
                                    onNewFecha={handleFecha}
                                    defaultValue={fechaGasto}
                                />
                                {alertFecha && (
                                    <IoIosAlert style={{ color: "#d32f2f", fontSize: "2rem" }} />
                                )}
                            </div>
                        </label>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="error">
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={handleFormSubmit} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
