import React, { useState, useEffect } from "react";
import {
    Paper,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    TableCell,
    TableBody,
} from "@mui/material";
import { CustomTablePagination } from "../../../components";
import { getLeadsNoAsignados } from "../helpers";

export const CustomAsignLeadTable = ({ setData, setFilterData }) => {


    const [selectAll, setSelectedAll] = useState(false);
    const [dataNoAsignados, setDataNoAsignados] = useState([]);

    // funcion para traer leads no asignados
    const traerDataNoasginados = async () => {
        const result = await getLeadsNoAsignados()
        const formatData = result.map((item) => {
            return {
                ...item,
                isSelected: false
            }
        })
        console.log(formatData)
        setDataNoAsignados(formatData);
        setData(result);
        setFilterData(result);

    }

    // traer la data de no asignados
    useEffect(() => {
        traerDataNoasginados()
    }, []);

    const onChangeSelected = ({ target }, idLead) => {
        const { checked } = target;
        const dataChange = dataNoAsignados.map((item) => {
            if (item.id === idLead) {
                return {
                    ...item,
                    isSelected: checked
                }
            } else {
                return item
            }
        })
        setDataNoAsignados(dataChange)
    }

    const onChangeAll = ({ target }) => {
        const { checked } = target;
        setSelectedAll(checked)
        let dataChange = []
        if (checked === false) {
            dataChange = dataNoAsignados.map((item) => {
                return {
                    ...item,
                    isSelected: checked
                }
            })
        } else {
            dataChange = dataNoAsignados.map((item) => {
                return {
                    ...item,
                    isSelected: checked
                }
            })
        }
        setDataNoAsignados(dataChange)
    }

    const asignarLeads = async () => {
        const filterDataSelected = dataNoAsignados.filter((item) => item.isSelected)
        console.log(filterDataSelected)
        // if assesor hay un valor: go
        // else mostrar alerta
        // 1 cuando no elige un asesor
        // 2 cuando no hay seleccionado ninguno: filterDataSaelected.length === 0
        const dataToBackend = {
            idAsesor: 1, // declarar variable asesor
            data: filterDataSelected
        }

        // activas circular progress
        // comunicacion con el backend: const result = await endporint(dataToBackend)
        // desactivas circular progress
        // si se quiere quedar en la pagina y mostrar datos en tiempo real: traerDataNoasginados()
        // si queremos regresar: onnavigateback()
    }

    return (
        <>
            <Paper>
                <TableContainer sx={{ minWidth: 700 }} aria-labelledby="customized table">
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow
                                sx={{
                                    "& th": {
                                        color: "rgba(96,96,96)",
                                        backgroundColor: "#f5f5f5",
                                    },
                                }}
                            >
                                <TableCell> Todos <input type="checkbox" checked={selectAll} onChange={onChangeAll} /></TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Celular</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Campaña</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataNoAsignados.map((item, index) => (
                                <TableRow key={index} >
                                    <TableCell> <input type="checkbox" checked={item.isSelected} onChange={(e) => { onChangeSelected(e, item.id) }} /> </TableCell>
                                    <TableCell>{item.nombre}</TableCell>
                                    <TableCell>{item.celular}</TableCell>
                                    <TableCell>{item.estadoLead}</TableCell>
                                    <TableCell>{item.campania.nombre}</TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <CustomTablePagination count={dataNoAsignados.length} />
            </Paper>
            <button onClick={asignarLeads} >Asignar</button>
        </>
    );
};

