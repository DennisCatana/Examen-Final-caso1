import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";
//import Mensaje from "./Alertas/Mensaje";

export const FormularioCl = ({cliente}) => {
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        cedula: cliente?.cedula ??"",
        nombre: cliente?.nombre ??"",
        apellido: cliente?.apellido ??"",
        ciudad: cliente?.ciudad??"",
        email: cliente?.email??"",
        direccion: cliente?.direccion ??"",
        telefono: cliente?.telefono??"",
        fechaNacimiento: cliente?.fechaNacimiento ??"",
    })
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        if (cliente?._id) {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizar/${cliente?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/clientes')
        }
        else {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/clientes/registro`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post(url, form, options)
            setMensaje({ respuesta: "cliente registrado", tipo: true })
            setTimeout(() => {
                navigate('/dashboard/clientes');
            }, 3000);
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
        }
    }

    return (
        
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                
                <label
                    htmlFor='cedula:'
                    className='text-gray-700 uppercase font-bold text-sm'>Cedula: </label>
                <input
                    id='cedula'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='cedula'
                    name='cedula'
                    value={form.cedula}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre'
                    name='nombre'
                    value={form.nombre}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='apellido'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='apellido'
                    name='apellido'
                    value={form.apellido}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='ciudad'
                    className='text-gray-700 uppercase font-bold text-sm'>Ciudad: </label>
                <input
                    id='ciudad'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='ciudad'
                    name='ciudad'
                    value={form.ciudad}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email del propietario'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='direccion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Dirección: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='direccion '
                    name='direccion'
                    value={form.direccion}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='telefono:'
                    className='text-gray-700 uppercase font-bold text-sm'>Telefono: </label>
                <input
                    id='telefono'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='telefono'
                    name='telefono'
                    value={form.telefono}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='fechaNacimiento:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de Nacimiento: </label>
                <input
                    id='fechaNacimiento'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Fecha de Nacimiento'
                    name='fechaNacimiento'
                    value={form.fechaNacimiento}
                    onChange={handleChange}
                />
            </div>




            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-900 cursor-pointer transition-all'
        value={cliente?._id ? 'Actualizar cliente' : 'Registrar cliente'} />

        </form>
    )
}