import React, { useContext, useEffect, useState } from "react";
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FiSearch } from "react-icons/fi";
import { getProyectos } from "../../filters/proyectos/getProyectos";
import { AuthContext } from "../../../auth";
import { getProductosByProyecto } from "./getProductosByProyecto";

const defaultOptionProyecto = {
    id: null,
    label: "Seleccione un proyecto",
    value: null,
};

const defaultOptionProducto = {
    id: null,
    label: "Seleccione un producto",
    value: null,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export const FilterProyectoProducto = ({ onAddProducto }) => {
    // auth token
    const { authTokens } = useContext(AuthContext);
    // data de proyectos
    const [proyecto, setProyecto] = useState([]);
    // proyecto seleccionado
    const [valueProyecto, setValueProyecto] = useState(defaultOptionProyecto);
    // data de campañas
    const [producto, setProducto] = useState([]);
    // campaña seleccionada
    const [valueProducto, setvalueProducto] = useState(defaultOptionProducto);

    // manejadores de dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // traer data de proyectos
    const traerDataProyectosProductos = async () => {
        const result = await getProyectos({ authToken: authTokens["access"] });
        const auxProyectos = result.map((element) => ({
            id: element.id,
            label: element.nombre,
            value: element.id,
        }));

        setProyecto([defaultOptionProyecto, ...auxProyectos]);
    };

    const handleChangeProyecto = async (event, value) => {
        setValueProyecto(value);
        if (value.id !== null) {
            // hacemos una peticion al backend
            const result = await getProductosByProyecto(value.id)
            console.log(result)
            const formatProductos = result.map((element) => {
                return {
                    id: element.id,
                    label: element.nombre,
                    value: element.id,
                };
            });
            setProducto([defaultOptionProducto, ...formatProductos]);
            setvalueProducto(defaultOptionProducto);
        } else {
            setProducto([]);
            setvalueProducto(defaultOptionProducto);
        }
    };

    const handleChangeproducto = (event, value) => {
        setvalueProducto(value);
    };

    const handledAceptarSeleccion = () => {
        // pasamos el valor de la campaña seleccionada
        const auxValue = valueProducto;
        if (auxValue["value"]) {
            onAddProducto(auxValue);
        } else {
            alert("Debes selecionar un producto");
        }
        // cerramos el cuadro de dialogo emergente
        handleClose();
    };

    const handleQuitarSeleccion = () => {
        // pasamos el valor de la campaña default
        onAddProducto(defaultOptionProducto);
        // seteamos la informacion
        setValueProyecto(defaultOptionProyecto);
        setvalueProducto(defaultOptionProducto);
        // cerramos el cuadro de dialogo emergente
        handleClose();
    };

    useEffect(() => {
        traerDataProyectosProductos();
    }, []);

    return (
        <>
            <IconButton onClick={handleClickOpen} color="primary">
                <FiSearch />
            </IconButton>
            <BootstrapDialog
                maxWidth={"md"}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Busqueda de campaña
                </DialogTitle>
                <DialogContent dividers>
                    <div className="flex flex-col gap-y-4">
                        {/* PROYECTO */}
                        <div>
                            <label
                                htmlFor="proyecto"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Proyecto
                            </label>
                            <Autocomplete
                                options={proyecto}
                                value={valueProyecto}
                                getOptionLabel={(option) => option.label}
                                disableClearable
                                onChange={handleChangeProyecto}
                                isOptionEqualToValue={(option, value) => option.id == value.id}
                                renderInput={(params) => <TextField {...params} size="small" />}
                            />
                        </div>
                        {/* CAMPAÑA */}
                        {valueProyecto.value && (
                            <div>
                                <label
                                    htmlFor="producto"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Campaña
                                </label>
                                <Autocomplete
                                    options={producto}
                                    value={valueProducto}
                                    getOptionLabel={(option) => option.label}
                                    disableClearable
                                    onChange={handleChangeproducto}
                                    isOptionEqualToValue={(option, value) =>
                                        option.id == value.id
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} size="small" />
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleQuitarSeleccion}>
                        Quitar
                    </Button>
                    <Button color="error" autoFocus onClick={handledAceptarSeleccion}>
                        Aceptar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};
