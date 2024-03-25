import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';
import { FormularioVh } from '../componets/Perfil/FormularioVh';



const Actualizar = () => {
    const { id } = useParams()
    const [tecnico, setTecnico] = useState({})
    const [mensaje, setMensaje] = useState({})

    useEffect(() => {
        const consultarTecnico = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/tecnicos/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setTecnico(respuesta.data)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarTecnico()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar tecnico</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de un tecnico</p>
            {
                Object.keys(tecnico).length != 0 ?
                    (
                        <FormularioVh tecnico={tecnico}/>
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