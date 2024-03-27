import React, { useContext, useEffect, useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material"
import { IoIosAlert } from "react-icons/io"
import { CustomDatePicker } from "../../../../components"
import { registrarPresupuesto } from "../../helpers/registrarPresupuesto"
import { consultTipoCambio } from "../../../campania/helpers/gastos/consultTipoCambio"
import { FilterBanco } from "../../../../components/filters/banco/FilterBanco"

export const CreatePresupuesto = ({
  idProyecto,
  handleCloseForm,
  submit,
}) => {
  const [alertDolar, setAlertDolar] = useState(false)
  const [alertSol, setAlertSol] = useState(false)
  const [alertFecha, setAlertFecha] = useState(false)
  const [alertTarjeta, setAlertTarjeta] = useState(false)
  const [tipoCambio, settipoCambio] = useState(3.66)
  const [presupuesto, setPresupuesto] = useState({
    presupuestoSoles: 0,
    presupuestoDolares: 0,
    fechaPresupuesto: "",
    proyecto: idProyecto,
    estado: "A",
    banco: null,
    tarjeta: ""
  })

  const {
    presupuestoSoles,
    presupuestoDolares,
    fechaPresupuesto,
    tarjeta,
    banco
  } = presupuesto

  const handleInputChange = (event) => {
    const { name, value } = event.target
    let newValue = value

    if (isNaN(value) || value < 0 || value === "") {
      setAlertSol(true)
      setAlertDolar(true)
    } else {
      setAlertSol(false)
      setAlertDolar(false)
    }

    if ( name === 'tarjeta' ) {
      const isTarjetaValid = value.length === 4 && /^\d+$/.test(value);
      setAlertTarjeta(!isTarjetaValid)
    }

    // Calcula el nuevo valor en función del tipo de cambio
    if (name === "presupuestoSoles") {
      newValue = (parseFloat(value) / tipoCambio).toFixed(2);
      setPresupuesto({
        ...presupuesto,
        presupuestoSoles: value,
        presupuestoDolares: newValue,
      });
    } else if (name === "presupuestoDolares") {
      newValue = (parseFloat(value) * tipoCambio).toFixed(2);
      setPresupuesto({
        ...presupuesto,
        presupuestoDolares: value,
        presupuestoSoles: newValue,
      });
    } else {
      // Si el valor no es numérico o es negativo, actualiza solo el campo actual
      setPresupuesto({
        ...presupuesto,
        [name]: value,
      });
    }
  }

  const handleFecha = (newDate) => {
    if (newDate != "") {
      setAlertFecha(false)
    }
    setPresupuesto({
      ...presupuesto,
      fechaPresupuesto: newDate,
    })
  }

  const onAddBanco = (item) => { 
    setPresupuesto({
      ...presupuesto, banco: item.id
    })
  }

  // cambiar tipo de cambio
  const handleChangeTipoCambio = ({ target }) => {
    const { value } = target;
    settipoCambio(value)

    let valueFormat = parseFloat(value)
    if (isNaN(valueFormat) || value.trim() === "") {
      valueFormat = 0
    }

    if (valueFormat === 0) {
      setPresupuesto({
        ...presupuesto,
        presupuestoDolares: 0
      })
    } else {
      const valuePresupuestoDolares = parseFloat(parseFloat(presupuestoSoles) / valueFormat).toFixed(2)
      setPresupuesto({
        ...presupuesto,
        presupuestoDolares: valuePresupuestoDolares
      })
    }
  }

  const validateData = () =>
    presupuestoSoles > 0 && presupuestoDolares > 0 && fechaPresupuesto !== ""

  const handleFormSubmit = async () => {
      // Validación del campo tarjeta
    const isTarjetaValid = tarjeta.length === 4 && /^\d+$/.test(tarjeta);

    // Validación del campo banco
    const isBancoValid = !!banco;

    // Validación de la fecha
    const isFechaValid = !!fechaPresupuesto;

    if (validateData() && isTarjetaValid && isBancoValid && isFechaValid) {
      const formatData = {
        ...presupuesto,
        tipoCambioSoles: tipoCambio
      };
      await registrarPresupuesto(formatData);
      submit();
    } else {
      setAlertSol(presupuestoSoles <= 0);
      setAlertDolar(presupuestoDolares <= 0);
      setAlertFecha(!isFechaValid);
      if (!isTarjetaValid) {
        // La tarjeta no tiene 4 dígitos o contiene caracteres no numéricos
        setAlertTarjeta(!isTarjetaValid)
      }
      if (!isBancoValid) {
        // El campo banco no ha sido seleccionado
        alert("Debe seleccionar un banco.");
      }
    }
  }

  // consultar el tipo de cambio
  const consultarTipoCambioDolares = async () => {
    try {
      const resultPeticion = await consultTipoCambio()
      const { compra } = resultPeticion
      settipoCambio(compra)
    } catch (e) {
      alert(e.message)
    }
  }



  useEffect(() => {
    consultarTipoCambioDolares()
  }, [])

  return (
    <Dialog open={true} onClose={handleCloseForm}>
      <DialogTitle
        className="flex justify-between items-center bg-purple-700 text-white"
        style={{ background: "#9E154A", color: "#fff" }}
      >
        <div className="flex">
          <span>Registrar presupuesto </span>
        </div>
        <div className="flex items-center">
          <span style={{ fontSize: 13, opacity: 0.7 }} className='mr-2'>
            Tipo cambio hoy:
          </span>
          <TextField
            type='number'
            value={tipoCambio}
            size='small'
            variant='standard'
            className="bg-white w-24"
            sx={{ paddingLeft: 0.5 }}
            onChange={handleChangeTipoCambio}
          />
        </div>
      </DialogTitle>
      <DialogContent>
        <form>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="presupuestoSoles">
              Presupuesto en Soles
            </InputLabel>
            <OutlinedInput
              id="presupuestoSoles"
              name="presupuestoSoles"
              type="number" // Cambia esto según el tipo correcto de tu dato
              value={presupuestoSoles}
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
              label="Presupuesto en Soles"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="presupuestoDolares">
              Presupuesto en Dólares
            </InputLabel>
            <OutlinedInput
              id="presupuestoDolares"
              name="presupuestoDolares"
              type="number" // Cambia esto según el tipo correcto de tu dato
              value={presupuestoDolares}
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
              label="Presupuesto en Dólares"
            />
            <div className="mt-5">
              <FilterBanco label="Banco" size="medium" onNewInput={onAddBanco} defaultValue={banco}/>
            </div>
            <FormControl sx={{ marginTop: 2}}>
              <InputLabel htmlFor="tarjeta">
                Tarjeta
              </InputLabel>
              <OutlinedInput
                value={tarjeta}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    {alertTarjeta && (
                      <IoIosAlert style={{ color: "#d32f2f", fontSize: "2rem" }} />
                    )}
                  </InputAdornment>
                }
                type="text"
                id="tarjeta"
                name="tarjeta"
                label="tarjeta"
                placeholder="3456"

              />
              <FormHelperText id="tarjeta">Escriba 4 dígitos</FormHelperText>
            </FormControl>
          </FormControl>
          <label className="flex flex-col gap-y-1">
            <span className=" block text-sm">Fecha en relacion al mes</span>
            <div className="flex flex-row items-center">
              <CustomDatePicker
                onNewFecha={handleFecha}
                defaultValue={fechaPresupuesto}
              />
              {alertFecha && (
                <IoIosAlert style={{ color: "#d32f2f", fontSize: "2rem" }} />
              )}
            </div>
          </label>
          

        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCloseForm} color="error">
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleFormSubmit} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
