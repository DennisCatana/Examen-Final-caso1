import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

const Visualizar = () => {
    const { id } = useParams()
    const [reserva, setReserva] = useState({})
    const [mensaje, setMensaje] = useState({})

   

    useEffect(() => {
        const consultarReserva = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/reservas/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setReserva(respuesta.data)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarReserva()
    }, [])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar reserva</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo permite visualizar los datos del reserva</p>
            </div>
            <div>
                {
                    Object.keys(reserva).length != 0 ?
                        (
                            <>
                            <div className='m-5 flex justify-between'>
                                <div>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">*Codigo: </span>
                                        {reserva.codigo}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Descripción: </span>
                                        {reserva.descripcion}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* IdCliente: </span>
                                        {`${reserva.idCliente._id}`}                                       
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* IdVehiculo: </span>
                                        {`${reserva.idVehiculo._id}`}                                       
                                    </p>
                                    {/*
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Anio de Fabricación: </span>
                                        {vehiculo.anioFabricacion}                                       
                                    </p>
                                   
                                    */}
                                    
                                    
                                    
                                </div>
                                
                            </div>
                            <hr className='my-4' />
                            
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