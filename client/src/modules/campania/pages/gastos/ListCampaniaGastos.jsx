import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFilterGastos } from '../../hooks'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { CustomAlert, CustomCircularProgress, CustomDatePicker, CustomDatePickerMonth } from '../../../../components'
import { DialogCreateGastoCampania, RowGastoCampania } from '../../components'
import { FiPlusCircle } from "react-icons/fi";
import { getGastosCampaniaById } from '../../helpers/gastos/getGastosCampaniaById'
import { AuthContext } from '../../../../auth'
import { combinarErrores, obtenerHoraActualFormatPostgress } from '../../../../utils'
import { useAlertMUI } from '../../../../hooks'
import { IoIosAlert } from 'react-icons/io'
import { consultTipoCambio } from '../../helpers/gastos/consultTipoCambio'
import { createGastosCampania } from '../../helpers/gastos/createGastosCampania'
import { getCampania } from '../../helpers/getCampania'
import { consultPresupuestoProyectoDate } from '../../helpers/gastos/consultPresupuestoProyectoDate'
import { deleteGastosCampania } from '../../helpers/gastos/deleteGastosCampania'
import { updateGastosCampania } from '../../helpers/gastos/updateGastosCampania'

// funcion total gasto por semana
const calculateSpentByWeek = (dataWeek, data) => {
    const inicioSemana = dataWeek[0]
    const finSemana = dataWeek[1]
    let sumaTotal = 0
    data.forEach((element) => {
        const parserDate = new Date(element["fechaGasto"])
        const day = parserDate.getDate()
        if (inicioSemana <= day && finSemana >= day) {
            sumaTotal += element["gastoDolares"]
        }
    })
    return sumaTotal
}

export const ListCampaniaGastos = () => {
    // id de la campaña de query params
    const { idCampania } = useParams()
    // token
    const { authTokens } = useContext(AuthContext);
    // datos del usuario
    const { currentUser } = useContext(AuthContext)
    // hook
    const { getSemanasPorMes, filtrarGastosPorSemana, showDataParser } = useFilterGastos();
    // modificador de fecha
    const [date, setDate] = useState(new Date())
    // informacion de semana seleccionada
    const [selectedSemana, setSelectedSemana] = useState(-1);
    // informacion de data
    const [data, setData] = useState([])
    // data campania
    const [dataCampania, setDataCampania] = useState(
        {
            nombre: "",
            proyecto: {},
            codigo: ""
        }
    )
    const { nombre, proyecto, codigo } = dataCampania
    // hook alert
    const {
        feedbackCreate,
        feedbackMessages,
        setFeedbackMessages,
        handleCloseFeedback,
        handleClickFeedback,
    } = useAlertMUI();

    // Retroalimentacion, estado de progreso.
    const [visibleProgress, setVisibleProgress] = useState(true);

    // navegar
    const navigate = useNavigate();
    const onNavigateBack = () => {
        navigate(-1);
    };

    // handle change semana
    const handleChangeSemana = ({ target }) => {
        const { value } = target
        setSelectedSemana(value)
    }
    // handle change mes
    const handleChangeDate = (newDate) => {
        setDate(newDate)
        setSelectedSemana(-1)
    }

    const traerInformacionCampania = async () => {
        try {
            const resultPeticion = await getCampania(idCampania, authTokens["access"])
            console.log(resultPeticion)
            setDataCampania(resultPeticion)
        } catch (error) {
            // ocultar el progress
            setVisibleProgress(false);
            const pilaError = combinarErrores(error);
            // mostramos feedback de error
            setFeedbackMessages({
                style_message: "error",
                feedback_description_error: pilaError,
            });
            handleClickFeedback();
        }

    }

    // traer gastos de campaña
    const traerGastoCampania = async () => {
        setVisibleProgress(true);
        try {
            const resultPeticion = await getGastosCampaniaById(`campania=${idCampania}`, authTokens["access"])
            console.log(resultPeticion)
            setVisibleProgress(false);
            setData(resultPeticion)
        } catch (error) {
            // ocultar el progress
            setVisibleProgress(false);
            const pilaError = combinarErrores(error);
            // mostramos feedback de error
            setFeedbackMessages({
                style_message: "error",
                feedback_description_error: pilaError,
            });
            handleClickFeedback();
        }
    }

    // actualización  de gasto
    const actualizarGastoCampania = async (idGastoCampania, body) => {
        const formatData = {
            ...body,
            usuarioActualizador: currentUser["user_id"],
            fecha_actualizacion: obtenerHoraActualFormatPostgress()
        }
        try {
            const resultPeticion = await updateGastosCampania(idGastoCampania, formatData, authTokens["access"])
            console.log(resultPeticion)

            const findIndexGasto = data.findIndex((element) => element.id === idGastoCampania)

            let auxDataGastoCampania = [...data]
            auxDataGastoCampania[findIndexGasto] = resultPeticion
            setData(auxDataGastoCampania)

        } catch (error) {
            // ocultar el progress
            setVisibleProgress(false)
            const pilaError = combinarErrores(error)
            // mostramos feedback de error
            setFeedbackMessages({
                style_message: "error",
                feedback_description_error: pilaError,
            });
            handleClickFeedback()
        }
    }

    // eliminacion de gasto
    const eliminarGastoCampania = async (idGastoCampania) => {
        try {
            await deleteGastosCampania(idGastoCampania, authTokens["access"])
            const filterData = data.filter((element) => element.id !== idGastoCampania)
            setData(filterData)
        } catch (error) {
            // ocultar el progress
            setVisibleProgress(false)
            const pilaError = combinarErrores(error)
            // mostramos feedback de error
            setFeedbackMessages({
                style_message: "error",
                feedback_description_error: pilaError,
            });
            handleClickFeedback()
        }
    }

    // agregar gasto de campañas
    const createGastoCampania = async (body) => {
        const dateRegistro = new Date(body["fechaGasto"])
        const anio = dateRegistro.getFullYear()
        const mes = dateRegistro.getMonth() + 1
        const idProyecto = proyecto["id"]

        try {
            const resultPeticionPresupuesto = await consultPresupuestoProyectoDate(
                { proyecto: idProyecto, anio, mes }
            )
            const { message } = resultPeticionPresupuesto;
            if (message) {
                // mostramos feedback de error
                setFeedbackMessages({
                    style_message: "warning",
                    feedback_description_error: message,
                });
                handleClickFeedback();
            } else {
                const { id: idProyectoPresupuesto } = resultPeticionPresupuesto
                const formatBodyCreation = {
                    gastoSoles: parseFloat(body["gastoSoles"]),
                    gastoDolares: parseFloat(body["gastoDolares"]),
                    tipoCambioSoles: parseFloat(body["tipoCambioSoles"]),
                    campania: parseInt(idCampania),
                    presupuestoProyecto: idProyectoPresupuesto,
                    fechaGasto: body["fechaGasto"],
                    usuarioCreador: currentUser["user_id"]
                }
                const resultPeticionGastoCampania = await createGastosCampania(formatBodyCreation, authTokens["access"])
                const dataFormatPush = [...data, resultPeticionGastoCampania]
                setData(dataFormatPush)
            }
        }
        catch (e) {
            let jsonParser = JSON.stringify(e)
            setFeedbackMessages({
                style_message: "warning",
                feedback_description_error: jsonParser,
            });
            handleClickFeedback();
        }
    }

    // informacion de semanas por mes
    const semanasFecha = getSemanasPorMes(date);
    // formato de fechas
    const fechaFormat = showDataParser(selectedSemana, semanasFecha, date)
    // data
    const filteredData = filtrarGastosPorSemana(data, semanasFecha, selectedSemana, date)

    useEffect(() => {
        traerInformacionCampania()
        traerGastoCampania()
    }, [])

    return (
        <>
            <main>
                <h2 className='text-center font-bold text-2xl'>Registro de gastos</h2>
                <section className='pb-4 p-2 mt-2 border-2'>
                    <p className='pb-2 font-semibold'>Datos de campaña</p>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div className="flex">
                            <span className="font-medium mr-3">Nombre: </span>
                            <span>{nombre}</span>
                        </div>

                        <div className='flex'>
                            <span className="font-medium mr-3">Código: </span>
                            <span>{codigo}</span>
                        </div>

                    </div>
                </section>
                <section className='mt-2 p-2 border-2'>
                    <p className='mb-2 font-semibold'>Acciones</p>
                    <div className='flex flex-row justify-between mb-4'>
                        <div className='flex flex-row gap-x-2'>
                            {/* DATE PICKER */}
                            <CustomDatePickerMonth value={date} onNewFecha={handleChangeDate} />
                            {/* SELECT SEMANA */}
                            <FormControl>
                                <Select
                                    size='small'
                                    value={selectedSemana}
                                    onChange={handleChangeSemana}
                                >
                                    <MenuItem key={-1} value={-1}>Todos</MenuItem>
                                    {
                                        semanasFecha.map((element, index) => (
                                            <MenuItem key={index} value={index}>{`Semana ${index + 1}`}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        {/* BOTON PARA REGISTRAR GASTO */}
                        <DialogCreateGastoCampania handleConfirm={createGastoCampania} />
                    </div>
                    <p className='text-center mb-3'>{`${fechaFormat["inicio"]} - ${fechaFormat["fin"]}`}</p>
                    <div className='mb-4'>
                        <p className='pb-2 font-semibold'>Información de gastos</p>
                        <Paper sx={{ borderRadius: "0px" }}>
                            <TableContainer
                                sx={{ minWidth: 700 }}
                                arial-aria-labelledby="customized table"
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow
                                            sx={{
                                                "& th": {
                                                    color: "rgba(200,200,200)",
                                                    backgroundColor: "#404040",
                                                },
                                            }}
                                        >
                                            {
                                                semanasFecha.map((element, index) => (
                                                    <TableCell align='center' key={index}
                                                        style={
                                                            {
                                                                backgroundColor: index === selectedSemana ? '#7de37f' : '#404040',
                                                                color: index === selectedSemana ? 'black' : '#C8C8C8'
                                                            }
                                                        }>
                                                        {`Semana ${index + 1}`}
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {
                                                semanasFecha.map((element, index) => (
                                                    <TableCell align='center' key={index} style={{ backgroundColor: index === selectedSemana ? '#7de37f' : 'white' }} >
                                                        {calculateSpentByWeek(element, filteredData)}
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                    <div className='pb-4'>
                        {/* PAPER TABLE */}
                        <Paper sx={{ borderRadius: "0px" }}>
                            <TableContainer
                                sx={{ minWidth: 700 }}
                                arial-aria-labelledby="customized table"
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow
                                            sx={{
                                                "& th": {
                                                    color: "rgba(200,200,200)",
                                                    backgroundColor: "#404040",
                                                },
                                            }}
                                        >
                                            <TableCell>Fecha</TableCell>
                                            <TableCell>Mes</TableCell>
                                            <TableCell>Dia</TableCell>
                                            <TableCell>Gasto</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            filteredData.map((element) => (
                                                <RowGastoCampania
                                                    key={element["id"]}
                                                    element={element}
                                                    onDeleteGastoCampania={eliminarGastoCampania}
                                                    onUpdateGastoCampania={actualizarGastoCampania}
                                                />
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                </section>
            </main>
            {/* COMPONENTE ALERTA */}
            <CustomAlert
                feedbackCreate={feedbackCreate}
                feedbackMessages={feedbackMessages}
                handleCloseFeedback={handleCloseFeedback}
            />

            {/* CIRCULAR PROGRESS */}
            {visibleProgress && <CustomCircularProgress />}
        </>
    )
}
