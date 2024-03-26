import React, { useContext, useEffect, useState } from "react"
import { useAlertMUI, useCustomTablePagination } from "../../../../hooks"
import { useNavigate } from "react-router-dom"
import {
  CustomAlert,
  CustomCircularProgress,
  CustomDatePickerFilter,
} from "../../../../components"
import { AuthContext } from "../../../../auth"
import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material"
import { MdClose, MdSearch } from "react-icons/md"
import { SelectBoolean, SelectEstadoLead, SelectProyecto } from "../../../../components/select"
import { RowItemLeadMarketing } from "./RowItemLeadMarketing"
import { MassActionsViewLeadsMarketing } from "./acciones-masivas/MassActionsViewLeadsMarketing"
import { combinarErrores, formatDate_ISO861_to_date } from "../../../../utils"
import { deleteLead, getLeads, getLeadsByQuery } from "../../helpers"
import SelectAsesor from "../../../../components/select/asesor-filter/SelectAsesor"

export const ViewLeadMarketingActivo = ({ startDate, endDate, flagReload, setFlagReload }) => {
  const { authTokens } = useContext(AuthContext)

  const [leads, setLeads] = useState([])
  const [auxLeads, setAuxLeads] = useState([])
  const [checked, setChecked] = useState(false)
  const [paginationValue,setPaginationValue] = useState({count: 0, next: '', previous: ''});

  // visible progress
  const [visibleProgress, setVisibleProgress] = useState(false)

  // pagination
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  } = useCustomTablePagination(auxLeads, 25)

  const {
    feedbackCreate,
    feedbackMessages,
    handleClickFeedback,
    handleCloseFeedback,
    setFeedbackMessages,
  } = useAlertMUI()

  // hook navegacion
  const navigate = useNavigate()

  // flag reset
  const [flagReset, setFlagReset] = useState()
  const [countSelectedElements, setCountSelectedElements] = useState(0)
  

  // numero de items seleccionados
  const [filterData, setFilterData] = useState({
    celular: "",
    nombre: "",
    estadoLead: "",
    proyecto: "",
    asignado: "",
    horaRecepcion: "",
    asesor: ""
  })

  const { celular, nombre, estadoLead, asignado, proyecto, horaRecepcion, asesor } =
    filterData

  const handledFilterData = () => {
    handleChangePage(null, 0)
    setFlagReload(prev => !prev)
    setFlagReset(true)
  }

  const handledResetDataFilter = () => {
    const resetDate = leads.map((element) => {
      return { ...element, isSelected: false }
    })
    setAuxLeads(resetDate)
    // reset filtros
    setFilterData({
      celular: "",
      nombre: "",
      proyecto: "",
      estadoLead: "",
      asignado: "",
      horaRecepcion: "",
      asesor: ''
    })
    setFlagReset(false)
  }

  // manejador de filtros para select values
  const handledFilterSelectValues = (value, name) => {
    setFilterData({
      ...filterData,
      [name]: value,
    })
    setFlagReset(false)
  }

  // manejador de filtros para input values
  const handledFilterInputValues = (event) => {
    const { target } = event
    const { value, name } = target
    setFilterData({
      ...filterData,
      [name]: value,
    })
    setFlagReset(false)
  }

  // manejador de filtros para date values
  const handledFilterDateValues = (newDate, filterName) => {
    setFilterData({
      ...filterData,
      [filterName]: newDate,
    })
    setFlagReset(false)
  }

  // FUNCIONES PARA EL MANEJO DE LOS LEADS POR MARKETING
  const handleChangeCheckAll = (event) => {
    const state = event.target.checked
    setChecked(state)
    const leadsChecked = auxLeads.map((element) => {
      return {
        ...element,
        isSelected: state,
      }
    })
    // actualizamos el numero de elmenentos seleccionados
    if (state) {
      setCountSelectedElements(leadsChecked.length)
    } else {
      setCountSelectedElements(0)
    }
    setAuxLeads(leadsChecked)
  }

  // seleccionar un elemento
  const handledCheckElement = (event, idItem) => {
    const dataItemChecked = auxLeads.map((element) =>
      element.id === idItem
        ? { ...element, isSelected: event.target.checked }
        : element
    )
    // actualizamos el valor del filtro
    setAuxLeads(dataItemChecked)
    // si hay algun cambio, el checkall pasa a false
    setChecked(false)
    // actualizamos el counter
    if (event.target.checked) {
      setCountSelectedElements((c) => c + 1)
    } else {
      setCountSelectedElements((c) => c - 1)
    }
  }

  // eliminar un lead
  const onEliminarLead = async (item) => {
    setVisibleProgress(true)
    const { id } = item
    const body = {
      estado: "I",
      celular: item["celular"],
      campania: item["campania"]["id"],
    }
    try {
      const result = await deleteLead(id, body, authTokens["access"])
      // obtenemos las campañas
      traerLeads()
      // cerramos el loader
      setVisibleProgress(false)
    } catch (error) {
      // ocultar el progress
      setVisibleProgress(false)
      const pilaError = combinarErrores(error)
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      })
      handleClickFeedback()
      // cerramos el loader
      setVisibleProgress(false)
    }
  }

  // traer leads
  const traerLeads = async () => {
    //setFlagReset(false)
    setVisibleProgress(true)
    setCountSelectedElements(0)
    try {
      let query = `asignado=true&estado=A&page=${page+1}`
      if (startDate && endDate) query += `&desde=${startDate}T00:00:00&hasta=${endDate}T23:59:59`
      if (filterData['celular']) query += `&celular=${filterData['celular']}`
      if (filterData['nombre']) query += `&nombre=${filterData['nombre']}`
      if (filterData['proyecto']) query += `&proyecto=${filterData['proyecto']}`
      if (filterData['estadoLead']) {
        let estadoLead = filterData['estadoLead']
        query += `&estadoLead=${estadoLead}`
      }
      if (filterData['horaRecepcion']){
        query += `&horaRecepcion=${filterData['horaRecepcion']}`
      }
      if (filterData['asesor']) query += `&asesor=${filterData['asesor']}`      

      const rowData = await getLeadsByQuery(authTokens["access"], query)
      setPaginationValue({count: rowData.count, next: rowData.next, previous: rowData.previous})

      const formatData = rowData.results.map((element) => {
        return {
          ...element,
          isSelected: false,
        }
      })
      setLeads(formatData)
      setAuxLeads(formatData)
      setVisibleProgress(false)
    } catch (error) {
      const pilaError = combinarErrores(error)
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      })
      handleClickFeedback()
      setVisibleProgress(false)
    }
  }

  const handleChangingPage = (event, newPage) => {
    handleChangePage(event, newPage)
    setFlagReload(prev => !prev)
  }

  useEffect(() => {
    traerLeads()
  }, [flagReload])

  return (
    <>
      <div className="flex items-center mb-2">
        <p className="mr-1">Acciones</p>
        <MassActionsViewLeadsMarketing
          data={auxLeads.filter((element) => element.isSelected)}
          handleClickFeedback={handleClickFeedback}
          setFeedbackMessages={setFeedbackMessages}
          setVisibleProgress={setVisibleProgress}
          onLoadData={traerLeads}
          activeMassActions={false}
        />
        <div className="flex items-center bg-green-100 rounded p-2">
          <p className="text-green-500 font-bold mr-2">
            Número de items seleccionados
          </p>
          <p className="text-green-500 font-bold">{countSelectedElements}</p>
        </div>
      </div>

      {/* SECCION DE DATA */}
      <Paper sx={{ borderRadius: "0px" }}>
        <TableContainer
          sx={{
            minHeight: 700,
          }}
          arial-aria-labelledby="customized table"
        >
          <TablePagination
            sx={{ backgroundColor: "#F4F0F0" }}
            rowsPerPageOptions={[25, 50, 75, 100]}
            component="div"
            count={paginationValue.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangingPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Table stickyHeader>
            <TableHead sx={{ background: "black" }}>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "#404040",
                    color: "whitesmoke",
                  },
                }}
              >
                <TableCell>
                  <Checkbox
                    checked={checked}
                    onChange={handleChangeCheckAll}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Proyecto</TableCell>
                <TableCell>Campaña</TableCell>
                <TableCell align="center">Asignado</TableCell>
                <TableCell align="center">Estado Lead</TableCell>
                <TableCell>Fecha recepción</TableCell>
                <TableCell>Asesor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {flagReset ? (
                    <Button
                      startIcon={<MdClose />}
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "0px",
                      }}
                      color="error"
                      variant="contained"
                      onClick={handledResetDataFilter}
                    >
                      Limpiar
                    </Button>
                  ) : (
                    <Button
                      startIcon={<MdSearch />}
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "0px",
                      }}
                      color="success"
                      variant="contained"
                      onClick={handledFilterData}
                    >
                      Buscar
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Número"
                    autoComplete="off"
                    type="number"
                    name="celular"
                    value={celular}
                    onChange={handledFilterInputValues}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Nombre"
                    autoComplete="off"
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={handledFilterInputValues}
                  />
                </TableCell>
                <TableCell>
                  <SelectProyecto
                    size="small"
                    onNewInput={handledFilterSelectValues}
                    defaultValue={proyecto}
                  />
                </TableCell>
                <TableCell>
                  Sin filtros
                </TableCell>
                <TableCell align="center">
                  <SelectBoolean
                    filterName="asignado"
                    onNewInput={handledFilterSelectValues}
                    defaultValue={asignado}
                  />
                </TableCell>
                <TableCell>
                  <SelectEstadoLead
                    size="small"
                    onNewInput={handledFilterSelectValues}
                    defaultValue={estadoLead}
                  />
                </TableCell>
                <TableCell>
                  <CustomDatePickerFilter
                    onNewFecha={handledFilterDateValues}
                    filterName="horaRecepcion"
                    defaultValue={horaRecepcion}
                  />
                </TableCell>
                <TableCell>
                  <SelectAsesor 
                    filterName="asesor"
                    onNewInput={handledFilterSelectValues}
                    defaultValue={asesor}
                  />
                </TableCell>
              </TableRow>
              {paginatedItems.map((item, index) => (
                <RowItemLeadMarketing
                  item={item}
                  key={index}
                  checkedElement={handledCheckElement}
                  onChangeLead={onEliminarLead}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {visibleProgress && <CustomCircularProgress />}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
    </>
  )
}
