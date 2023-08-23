import { TableCell, TableRow } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomMoreVerticalActions } from '../../../../../components/CustomMoreVerticalActions';

export const RowItemCampania = ({item, onShowDeleteDialog}) => {
  const { 
        id,
        nombre, 
        fecha_estimada,
        fecha_cierre,
        coste_estimado,
        proyecto,
        subCategoria,
        categoria
    } = item;
    
  const navigate = useNavigate();

  const onDeleteItemSelected = () => {
    onShowDeleteDialog(item);
  }

  const onEditItemSelected = () => {
    navigate(`/marketing/campaña/update/${id}`);
  }

  return (
    <TableRow
        sx={{"&:last-child td, &:last-child th": {border: 0},}}
    >
        <TableCell>
            <CustomMoreVerticalActions
                onDelete={onDeleteItemSelected}
                onEdit={onEditItemSelected}
            />
        </TableCell>
        <TableCell>{nombre}</TableCell>
        <TableCell>{fecha_estimada}</TableCell>
        <TableCell>{fecha_cierre}</TableCell>
        <TableCell>{coste_estimado}</TableCell>
        <TableCell>{proyecto.nombre}</TableCell>
        <TableCell>{subCategoria.nombre}</TableCell>
        <TableCell>{categoria.nombre}</TableCell>
    </TableRow>
  )
}
