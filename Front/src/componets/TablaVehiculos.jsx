import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from 'react-router-dom'



const TablaVehiculos = () => {
    const navigate = useNavigate()
    const [tecnicos, setTecnicos] = useState([])
 
    const listarTecnicos = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/tecnicos`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setTecnicos(respuesta.data, ...tecnicos)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarTecnicos()
    }, [])

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a eliminar un tecnico, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/tecnicos/eliminar/${id}`
                const headers= {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                const data ={
                    salida:new Date().toString()
                }
                await axios.delete(url, {headers, data});
                listarTecnicos()
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                tecnicos.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido</th>
                                <th className='p-2'>Cedula</th>
                                <th className='p-2'>Genero</th>
                                <th className='p-2'>Telefono</th>
                               
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tecnicos.map((tecnicos, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={tecnicos._id}>
                                        <td>{index + 1}</td>
                                        <td>{tecnicos.nombre}</td>
                                        <td>{tecnicos.apellido}</td>
                                        <td>{tecnicos.cedula}</td>
                                        <td>{tecnicos.genero}</td>
                                        <td>{tecnicos.telefono}</td>
                                        
                                        
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 " onClick={() => navigate(`/dashboard/visualizarTecnico/${tecnicos._id}`)}/>

                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/actualizarTecnico/${tecnicos._id}`)}  />

                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"  onClick={() => { handleDelete(tecnicos._id) }} />
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

export default TablaVehiculos