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
} from "@mui/material"
import { IoIosAlert } from "react-icons/io"
import { CustomDatePicker } from "../../../../components"
import { obtenerPresupuestoProyecto } from "../../helpers/obtenerPresupuesto"
import { updatePresupuesto } from "../../helpers/updatePresupuesto"

export const EditarPresupuesto = ({
  idPresupuesto,
  handleCloseForm,
  submit,
}) => {
  const [alertDolar, setAlertDolar] = useState(false)
  const [alertSol, setAlertSol] = useState(false)
  const [alertFecha, setAlertFecha] = useState(false)
  const [presupuesto, setPresupuesto] = useState({
    presupuestoSoles: 0,
    presupuestoDolares: 0,
    tipoCambioSoles: 0,
    fechaPresupuesto: "",
  })

  const {
    presupuestoSoles,
    presupuestoDolares,
    tipoCambioSoles,
    fechaPresupuesto,
  } = presupuesto

  const obtenerPresupuesto = async () => {
    try {
      const result = await obtenerPresupuestoProyecto(idPresupuesto)
      setPresupuesto({
        ...result,
      })
    } catch (error) {
      handleCloseForm()
    }
  }

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
    if (name === "presupuestoSoles") {
      newValue = (parseFloat(value) / tipoCambioSoles).toFixed(2)
    } else if (name === "presupuestoDolares") {
      newValue = (parseFloat(value) * tipoCambioSoles).toFixed(2)
    }

    setPresupuesto({
      ...presupuesto,
      [name]: value,
      // Actualiza el otro campo en tiempo real
      ...(name === "presupuestoSoles"
        ? { presupuestoDolares: newValue }
        : { presupuestoSoles: newValue }),
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
    if (validateData()) {
      const result = await updatePresupuesto(idPresupuesto, presupuesto)
      submit()
    } else {
      setAlertSol(presupuestoSoles <= 0)
      setAlertDolar(presupuestoDolares <= 0)
      setAlertFecha(fechaPresupuesto === "")
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
