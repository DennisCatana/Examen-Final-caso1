
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';
import { FormularioRs } from '../componets/Perfil/FormularioRs';



const ActualizarRs = () => {
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
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Vehiculo</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar </p>
            {
                Object.keys(reserva).length != 0 ?
                    (
                        <FormularioRs reserva={reserva}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>

    )
}

export default ActualizarRs