import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

const Visualizar = () => {
    const { id } = useParams()
    const [vehiculo, setVehiculo] = useState({})
    const [mensaje, setMensaje] = useState({})

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
			nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
        return new Intl.DateTimeFormat('es-EC',{dateStyle:'long'}).format(nuevaFecha)
    }

    useEffect(() => {
        const consultarVehiculo = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setVehiculo(respuesta.data)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarVehiculo()
    }, [])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar vehiculo</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo permite visualizar los datos del vehiculo</p>
            </div>
            <div>
                {
                    Object.keys(vehiculo).length != 0 ?
                        (
                            <>
                            <div className='m-5 flex justify-between'>
                                <div>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Marca de Vehiculo: </span>
                                        {vehiculo.marca}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Modelo del Vehiculo: </span>
                                        {vehiculo.modelo}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Anio de Fabricación: </span>
                                        {vehiculo.anioFabricacion}                                       
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Placa: </span>
                                        {vehiculo.placa}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Color: </span>
                                        {vehiculo.color}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Tipo Vehiculo: </span>
                                        {vehiculo.tipoVehiculo}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Kilometraje: </span>
                                        {vehiculo.kilometraje}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Descripción: </span>
                                        {vehiculo.descripcion}
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

export default Visualizar