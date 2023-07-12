import React from 'react'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const CreateRol = () => {

  const navigate = useNavigate()
  const [form, setForm] = React.useState({rolName: ""})
  const { rolName } = form

  const handleChange = (event) => {
    const {name, value } = event.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if ( rolName ) {
      
    }
  }

  return (
    <div className='w-4/5  max-w-screen-sm mx-auto flex flex-col gap-y-5'>
      <h1 className='text-center font-semibold text-2xl'>Registrar Rol</h1>
      <form
        onSubmit={handleSubmit}
        method='post'
        className='min-w-[242px] flex flex-col gap-y-6'
      >
        <label className="block flex flex-col gap-y-1">
          <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
            Rol
          </span>
          <input
            type="text"
            name="rolName"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Administrador"
            id='rolName'
            value={rolName}
            onChange={handleChange}
          />
        </label>

        <div className='flex justify-end gap-x-5'>
          <Link to={""}>
            <Button
              variant='contained'
              color='error'
              size="small"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
          </Link>
          <Button
            variant='contained'
            color='success'
            type='submit'
            size="small"
          >
            Guardar
          </Button>
        </div>
      </form >
    </div >
  )
}

export default CreateRol