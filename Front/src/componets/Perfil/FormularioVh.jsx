import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";


export const FormularioVh = ({vehiculo}) => {

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        marca: vehiculo?.marca?? "",
        modelo:  vehiculo?.modelo?? "",
        anioFabricacion:  vehiculo?.anioFabricacion?? "",
        placa: vehiculo?.placa?? "",
        color: vehiculo?.color?? "",
        tipoVehiculo: vehiculo?.tipoVehiculo?? "",
        kilometraje: vehiculo?.kilometraje?? "",
        descripcion: vehiculo?.descripcion?? "",
})
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (vehiculo?._id) {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos/actualizar/${vehiculo?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/vehiculos')
        }
        else {
       
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos/registro`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post(url, form, options)
            setMensaje({ respuesta: "vehiculo registrado", tipo: true })
            setTimeout(() => {
                navigate('/dashboard/vehiculos');
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
                <h1 className='font-black text-4xl text-gray-500'>Agregar Vehiculo</h1>
                <hr className='my-4' />
                <label
                    htmlFor='marca:'
                    className='text-gray-700 uppercase font-bold text-sm'>Marca: </label>
                <input
                    id='marca'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='marca'
                    name='marca'
                    value={form.marca}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='modelo:'
                    className='text-gray-700 uppercase font-bold text-sm'>Modelo: </label>
                <input
                    id='modelo'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='modelo'
                    name='modelo'
                    value={form.modelo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='anioFabricacion'
                    className='text-gray-700 uppercase font-bold text-sm'>Anio de Fabricacion: </label>
                <input
                    id='anioFabricacion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='anioFabricacion'
                    name='anioFabricacion'
                    value={form.anioFabricacion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='placa'
                    className='text-gray-700 uppercase font-bold text-sm'>Placa: </label>
                <input
                    id='placa'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='placa'
                    name='placa'
                    value={form.placa}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='color'
                    className='text-gray-700 uppercase font-bold text-sm'>Color: </label>
                <input
                    id='color'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='color'
                    name='color'
                    value={form.color}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='tipoVehiculo'
                    className='text-gray-700 uppercase font-bold text-sm'>Tipo de Vehículo: </label>
                <input
                    id='tipoVehiculo'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='tipoVehiculo '
                    name='tipoVehiculo'
                    value={form.tipoVehiculo}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='kilometraje'
                    className='text-gray-700 uppercase font-bold text-sm'>Kilometraje: </label>
                <input
                    id='kilometraje'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='kilometraje'
                    name='kilometraje'
                    value={form.kilometraje}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='descripcion'
                    className='text-gray-700 uppercase font-bold text-sm'>Descripción: </label>
                <input
                    id='descripcion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='descripcion'
                    name='descripcion'
                    value={form.descripcion}
                    onChange={handleChange}
                />
            </div>




            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-900 cursor-pointer transition-all'
        value={vehiculo?._id ? 'Actualizar vehiculo' : 'Registrar vehiculo'} />

        </form>
    )
}
