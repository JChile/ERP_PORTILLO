import { IconButton, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { showMonthParser } from '../../../../utils'

export const RowPresupuestoProyecto = ({ presupuesto, onEdit }) => {
    const restoPresupuestoDolares = restarPresupuestos(presupuesto["presupuestoDolares"], presupuesto["gastoTotalCampaniasDolares"])
    const restoPresupuestoSoles = restarPresupuestos(presupuesto["presupuestoSoles"], presupuesto["gastoTotalCampaniasSoles"])

    return (
        <TableRow key={presupuesto.id}>
            <TableCell>
                <IconButton
                    size="m"
                    color="warning"
                    onClick={() => onEdit(presupuesto.id)}
                >
                    <FaRegEdit />
                </IconButton>
            </TableCell>
            <TableCell>
                <span style={{ fontWeight: "bold" }}>
                    {showMonthParser(presupuesto["fechaPresupuesto"])}
                </span>
            </TableCell>
            <TableCell>
                <span className="block">
                    $ {presupuesto["presupuestoDolares"].toFixed(2)}
                </span>
                <span className="block">
                    S/ {presupuesto["presupuestoSoles"].toFixed(2)}
                </span>
            </TableCell>
            <TableCell>
                <span className="block">
                    $ {presupuesto["gastoTotalCampaniasDolares"].toFixed(2)}
                </span>
                <span className="block">
                    S/ {presupuesto["gastoTotalCampaniasSoles"].toFixed(2)}
                </span>
            </TableCell>
            <TableCell>
                <span className={`block font-bold ${restoPresupuestoDolares <= 0 ? 'text-red-500' : 'text-green-800'}`}>
                    $ {restoPresupuestoDolares}
                </span>
                <span className={`block font-bold ${restoPresupuestoSoles <= 0 ? 'text-red-500' : 'text-green-800'}`}>
                    S/ {restoPresupuestoSoles}
                </span>
            </TableCell>
            <TableCell>
                S/ {presupuesto["tipoCambioSoles"].toFixed(2)}
            </TableCell>
        </TableRow >
    )
}

function restarPresupuestos(presupuestoA, presupuestoB) {
    const parserPresupuestoA = parseFloat(presupuestoA)
    const parserPresupuestoB = parseFloat(presupuestoB)
    const resto = (parserPresupuestoA - parserPresupuestoB).toFixed(2)
    return resto
}
