import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  CircularProgress,
  Box,
} from "@mui/material"
import { IoIosAlert } from "react-icons/io"
import { CustomDatePicker } from "../../../../components"
import { obtenerPresupuestoProyecto } from "../../helpers/obtenerPresupuesto"
import { updatePresupuesto } from "../../helpers/updatePresupuesto"
import { FilterBanco } from "../../../../components/filters/banco/FilterBanco"

export const EditarPresupuesto = ({
  idPresupuesto,
  handleCloseForm,
  submit,
}) => {
  const [alertDolar, setAlertDolar] = useState(false)
  const [alertSol, setAlertSol] = useState(false)
  const [alertFecha, setAlertFecha] = useState(false)
  const [alertTarjeta, setAlertTarjeta] = useState(false)
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos


  const [presupuesto, setPresupuesto] = useState({
    presupuestoSoles: 0,
    presupuestoDolares: 0,
    tipoCambioSoles: 0,
    fechaPresupuesto: "",
    banco: null,
    tarjeta: ""
  })

  const {
    presupuestoSoles,
    presupuestoDolares,
    tipoCambioSoles,
    fechaPresupuesto,
    banco,
    tarjeta
  } = presupuesto

  const obtenerPresupuesto = async () => {
    try {
      const result = await obtenerPresupuestoProyecto(idPresupuesto)
      //console.log(result)
      setPresupuesto({
        ...result,
      })
      setLoading(false); // Marcar la carga como completa cuando se obtienen los datos
    } catch (error) {
      handleCloseForm()
    }
  }

  //console.log(presupuesto)

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
      newValue = (parseFloat(value) / tipoCambioSoles).toFixed(2);
      setPresupuesto({
        ...presupuesto,
        presupuestoSoles: value,
        presupuestoDolares: newValue,
      });
    } else if (name === "presupuestoDolares") {
      newValue = (parseFloat(value) * tipoCambioSoles).toFixed(2);
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

  const onAddBanco = (item) => { 
    setPresupuesto({
      ...presupuesto, banco: item.id
    })
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

  const validateData = () =>
    presupuestoSoles > 0 && presupuestoDolares > 0 && fechaPresupuesto !== ""

  const handleFormSubmit = async () => {
    const isTarjetaValid = tarjeta.length === 4 && /^\d+$/.test(tarjeta);

    // Validación del campo banco
    const isBancoValid = !!banco;

    // Validación de la fecha
    const isFechaValid = !!fechaPresupuesto;

    if (validateData() && isTarjetaValid && isBancoValid && isFechaValid) {
      const result = await updatePresupuesto(idPresupuesto, presupuesto)
      submit();
    } else {
      console.log(presupuesto)
      setAlertSol(true);
      setAlertDolar(true);
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

  useEffect(() => {
    obtenerPresupuesto()
  }, [])

  return (
    <Dialog open={true} onClose={handleCloseForm}>
      <DialogTitle
        className="flex justify-between items-center"
        style={{ background: "#9E154A", color: "#fff" }}
      >
        <span>Editar Presupuesto </span>
        <span style={{ fontSize: 13, opacity: 0.7 }}>
          (Tipo cambio registrado: {tipoCambioSoles})
        </span>
      </DialogTitle>
      { !loading ?
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
        : 
        <DialogContent 
          style={{ 
            minHeight: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center" }}
          >
          <Box>
            <CircularProgress />
          </Box>
        </DialogContent>
      }
      
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
