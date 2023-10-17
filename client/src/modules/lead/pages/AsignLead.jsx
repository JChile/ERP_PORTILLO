import React, { useEffect, useState } from "react";
import { getLeadsNoAsignados, multipleAsingAsesor } from "../helpers";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { CustomInputBase } from "../../../components/CustomInputBase";
import {
    Paper,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    TableCell,
    TableBody,
    Button,
} from "@mui/material";
import { CustomTablePagination } from "../../../components";
import { FilterAsesor } from "../../../components/filters/asesor/FilterAsesor";
import { useAlertMUI } from "../../../hooks";


const filters = ["Nombre", "Estado", "Campaña"];

export const AsignLeads = () => {

    const [visibleProgress, setVisibleProgress] = useState(false);
    const [selectAll, setSelectedAll] = useState(false);
    const [dataNoAsignados, setDataNoAsignados] = useState([]);
    const [asesor, setAsesor] = useState(0);

    const {
        feedbackCreate,
        feedbackMessages,
        setFeedbackMessages,
        handleCloseFeedback,
        handleClickFeedback,
    } = useAlertMUI();

    const onAddAsesor = (item) => {
        setAsesor(item.id)
    };

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

        // if assesor hay un valor: go
        // else mostrar alerta
        // 1 cuando no elige un asesor
        // 2 cuando no hay seleccionado ninguno: filterDataSaelected.length === 0
        if ((asesor != 0 && asesor != null) && (filterDataSelected.length != 0)) {
            const idsArray = filterDataSelected.map((item) => item.id);
            const dataToBackend = {
                idAsesor: asesor, // declarar variable asesor
                idLead: idsArray,
            }
            setVisibleProgress(true);
            console.log(dataToBackend);
            const result = await multipleAsingAsesor(dataToBackend);
            console.log("-----", idsArray);
            console.log(result);
            setVisibleProgress(false);
            traerDataNoasginados();

        } else {
            setFeedbackMessages({
                style_message: "warning",
                feedback_description_error: "Asesor o leads para asignar no se seleccionaron",
            });
            handleClickFeedback();
        }

        // activas circular progress
        // comunicacion con el backend: const result = await endporint(dataToBackend)
        // desactivas circular progress
        // si se quiere quedar en la pagina y mostrar datos en tiempo real: traerDataNoasginados()
        // si queremos regresar: onnavigateback()
    }

    const handleSearchButton = (filter, pattern) => {
        const filterValue = filters.find((element) => element === filter);

        if (!filterValue) return;

        switch (filterValue) {
            case "Nombre": {
                const filteredData = leads.filter((item) => {
                    const { nombre, apellido } = item;
                    const joinName = `${nombre}${apellido}`;
                    return joinName.toLowerCase().includes(pattern.toLowerCase());
                });
                setFilterLeads(filteredData);
                break;
            }
            case "Estado": {
                const filteredData = leads.filter((item) => {
                    const { estado } = item;
                    const { nombre } = estado;
                    return nombre.toLowerCase().includes(pattern.toLowerCase());
                });
                setFilterLeads(filteredData);
                break;
            }
            case "Campaña": {
                const filteredData = leads.filter((item) => {
                    const { campania } = item;
                    const { nombre } = campania;
                    return nombre.toLowerCase().includes(pattern.toLowerCase());
                });
                setFilterLeads(filteredData);
                break;
            }
        }
    };

    return (
        <>
            <div className="px-7 mt-8 mb-8 flex justify-between items-center">
                <div className="flex flex-col gap-y-1">
                    <CustomInputBase
                        filters={filters}
                        defaultFilter={filters[0]}
                        onSearch={handleSearchButton}
                        placeholder="Buscar lead..."
                    />
                </div>

                <div className="flex flex-row gap-y-1 w-full justify-end">
                    <Button onClick={() => asignarLeads()} >Asignar Asesor</Button>
                    <label className="flex flex-col w-1/2 gap-x-4">
                        <FilterAsesor onNewInput={onAddAsesor} />
                    </label>
                </div>
            </div>

            <div className="px-7">
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
                                        <TableCell>
                                            <input type="checkbox" checked={item.isSelected} onChange={(e) => { onChangeSelected(e, item.id) }} />
                                        </TableCell>
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
            </div>
            <CustomAlert
                feedbackCreate={feedbackCreate}
                feedbackMessages={feedbackMessages}
                handleCloseFeedback={handleCloseFeedback}
            />
            {visibleProgress && <CustomCircularProgress />}
        </>
    );
};
