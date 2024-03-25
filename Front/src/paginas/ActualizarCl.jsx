import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';
import { FormularioCl } from '../componets/Perfil/FormularioCl';


const ActualizarCl = () => {
    const { id } = useParams()
    const [cliente, setCliente] = useState({})
    const [mensaje, setMensaje] = useState({})

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
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Cliente</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los daos del cliente</p>
            {
                Object.keys(cliente).length != 0 ?
                    (
                        <FormularioCl cliente={cliente}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>

    )
}

export default ActualizarCl