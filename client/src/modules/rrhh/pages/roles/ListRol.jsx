import React from 'react'
import RolItem from '../components/RolItem';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const ListRol = () => {

    const listRoles = ["Marketing", "Ventas", "RRHH"]

    const list = listRoles.map((value, index) => {
        return (
            <RolItem key={index} name={value} />
        )
    })

    return (
        <div className='flex flex-col gap-y-6 items-center'>
            <h1 className='text-center font-semibold text-2xl'>Gestión de Roles</h1>
            <div className='w-4/5  max-w-screen-sm'>
                {/* por ahora esta asi. */}
                <Link to="/rrhh/roles/create">
                    <Button
                        variant='contained'
                        color='success'
                        size="small"
                    >
                        Agregar rol
                    </Button>
                </Link>
            </div>
            <div className='w-4/5 max-w-screen-sm flex flex-col gap-y-4'>
                {list}
            </div>
        </div>
    )
}

export default ListRol