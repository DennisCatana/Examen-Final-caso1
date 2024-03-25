import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';




const VisualizarCl = () => {
    const { id } = useParams()
    const [cliente, setCliente] = useState({});
    
    const [mensaje, setMensaje] = useState({})

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
			nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
        return new Intl.DateTimeFormat('es-EC',{dateStyle:'long'}).format(nuevaFecha)
    }

    useEffect(() => {
        const consultarCliente = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/clientes/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setCliente(respuesta.data)

            } catch (error) {
                    setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarCliente()
    }, [id])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Cliente</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos del Cliente</p>
            </div>
            <div>
            {Object.keys(cliente).length !== 0 ? (
                            <>
                            <div className='m-5 flex justify-between'>
                                <div>
                                <p className="text-md text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Cedula del Cliente: </span>
                                    {cliente.cedula}
                                </p>
                
                                        <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Nombre del Cliente: </span>
                                        {cliente.nombre}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">*Ciudad: </span>
                                        {cliente.ciudad}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Email: </span>
                                        {(cliente.email)}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Dirección: </span>
                                        {(cliente.direccion)}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Telefono: </span>
                                        {(cliente.telefono)}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Fecha Naciemiento: </span>
                                        {formatearFecha(cliente.fechaNacimiento)}
                                    </p>
                                   
                                </div>
                                <div>
                                    <img src="https://cdn-icons-png.flaticon.com/512/2138/2138440.png" alt="dogandcat" className='h-80 w-80' />
                                </div>
                            </div>
                            <hr className='my-4' />
                            <p className='mb-8'>Este submódulo te permite visualizar los tratamientos del paciente</p>
                            </>
                        )
                        :
                        (
                            Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                        )
                }
            </div>
        </>

    )
}

export default VisualizarCl