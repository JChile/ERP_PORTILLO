import React from 'react'
import PortilloLogo from "../../../assets/portillo-logo-port.png"

export const Login = () => {

  const [form, setForm] = React.useState({ user: "", password: "" })


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  const onFormChange = (event) => {
    const { name, value } = event.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='grid place-content-center h-screen'>
      <div className='grid place-content-center rounded-t-lg bg-gray-400 p-4'>
        <img
          src={PortilloLogo}
          alt="portillo's logo"
        />
      </div>
      <div className='flex flex-col gap-y-6 bg-rose-700 p-8 rounded-b-lg'>
        <h1
          className='text-center font-extrabold text-white '
        >
          Inicio de Sesión
        </h1>
        <form
          method='post'
          className='flex flex-col gap-y-6'
          onSubmit={handleSubmit}
        >

          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium text-white">
              Usuario
            </span>
            <input
              type="number"
              name="user"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="123729873"
              id='user'
              value={form.user}
              onChange={onFormChange}
            />
          </label>

          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium text-white">
              Contraseña
            </span>
            <input
              onChange={onFormChange}
              id='password'
              type="password"
              name="password"
              value={form.password}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="******"
            />
          </label>


          <button
            type="submit"
            className='bg-sky-700 text-white py-2 rounded'
          >
            Iniciar Sesión
          </button>


          <p className='text-white text-xs'>
            ¿No tienes cuenta?
            <a
              href="#"
              className='ml-2 font-medium'
            >
              Solicitar Acceso
            </a>
          </p>

        </form>

      </div>


    </div>
  )
}
