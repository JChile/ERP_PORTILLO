import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { IoIosAlert } from 'react-icons/io'
import { CustomDatePicker } from '../../../../components'
import { consultTipoCambio } from '../../helpers/gastos/consultTipoCambio'

export const DialogCreateGastoCampania = ({ handleConfirm }) => {
    const [open, setOpen] = useState(false)
    const [alertDolar, setAlertDolar] = useState(false)
    const [alertSol, setAlertSol] = useState(false)
    const [alertFecha, setAlertFecha] = useState(false)
    const [tipoCambio, setTipoCambio] = useState(3.66)
    const [gasto, setgasto] = useState({
        gastoSoles: 0,
        gastoDolares: 0,
        fechaGasto: "",
    });

    const {
        gastoSoles,
        gastoDolares,
        fechaGasto,
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
            const body = {
                ...gasto,
                tipoCambioSoles: tipoCambio
            }
            handleConfirm(body);
            handleClose();
        } else {
            setAlertSol(gastoSoles <= 0);
            setAlertDolar(gastoDolares <= 0);
            setAlertFecha(fechaGasto === "");
        }
    };

    // consultar el tipo de cambio
    const consultarTipoCambioDolares = async () => {
        try {
            const resultPeticion = await consultTipoCambio()
            const { compra } = resultPeticion
            setTipoCambio(compra)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        consultarTipoCambioDolares()
    }, [])

    return (
        <div>
            <Button startIcon={<FiPlusCircle />} color='primary' variant='contained' onClick={handleClickOpen}>
                Agregar
            </Button>
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
