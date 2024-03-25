import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';
import { FormularioVh } from '../componets/Perfil/FormularioVh';



const Actualizar = () => {
    const { id } = useParams()
    const [vehiculo, setVehiculo] = useState({})
    const [mensaje, setMensaje] = useState({})

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
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Vehiculo</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de un Vehiculo</p>
            {
                Object.keys(vehiculo).length != 0 ?
                    (
                        <FormularioVh vehiculo={vehiculo}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>

    )
}

export default Actualizar