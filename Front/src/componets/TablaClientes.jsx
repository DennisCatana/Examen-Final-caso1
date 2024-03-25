import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from 'react-router-dom'




const TablaClientes = () => {

    const navigate = useNavigate()

    const [clientes, setClientes] = useState([])
 
    const listarClientes = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/clientes`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setClientes(respuesta.data, ...clientes)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarClientes()
    }, [])

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a registrar la salida de un paciente, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/eliminar/${id}`
                const headers= {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                const data ={
                    salida:new Date().toString()
                }
                await axios.delete(url, {headers, data});
                listarClientes()
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                clientes.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Cedula</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido</th>
                                <th className='p-2'>Ciudad</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Telefono</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.map((clientes, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={clientes._id}>
                                        <td>{index + 1}</td>
                                        <td>{clientes.cedula}</td>
                                        <td>{clientes.nombre}</td>
                                        <td>{clientes.apellido}</td>
                                        <td>{clientes.ciudad}</td>
                                        <td>{clientes.email}</td>
                                        <td>{clientes.telefono}</td>
                                        
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/visualizarCliente/${clientes._id}`)} />

                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/actualizarCliente/${clientes._id}`)}     />

                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" onClick={() => { handleDelete(clientes._id) }} />
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
            }
        </>

    )
}

export default TablaClientes