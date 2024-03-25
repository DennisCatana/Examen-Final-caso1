import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from 'react-router-dom'



const TablaVehiculos = () => {
    const navigate = useNavigate()
    const [vehiculos, setVehiculos] = useState([])
 
    const listarVehiculos = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setVehiculos(respuesta.data, ...vehiculos)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarVehiculos()
    }, [])

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a eliminar un vehiculo, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos/eliminar/${id}`
                const headers= {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                const data ={
                    salida:new Date().toString()
                }
                await axios.delete(url, {headers, data});
                listarVehiculos()
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                vehiculos.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Marca</th>
                                <th className='p-2'>Modelo</th>
                                <th className='p-2'>Año de Fabricación</th>
                                <th className='p-2'>Placa</th>
                                <th className='p-2'>Color</th>
                                <th className='p-2'>Kilometraje</th>
                                <th className='p-2'>Descripción</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vehiculos.map((vehiculos, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={vehiculos._id}>
                                        <td>{index + 1}</td>
                                        <td>{vehiculos.marca}</td>
                                        <td>{vehiculos.modelo}</td>
                                        <td>{vehiculos.anioFabricacion}</td>
                                        <td>{vehiculos.placa}</td>
                                        <td>{vehiculos.color}</td>
                                        <td>{vehiculos.kilometraje}</td>
                                        <td>{vehiculos.descripcion}</td>
                                        
                                        
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 " onClick={() => navigate(`/dashboard/visualizarVehiculos/${vehiculos._id}`)}/>

                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/actualizarVehiculo/${vehiculos._id}`)}  />

                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"  onClick={() => { handleDelete(vehiculos._id) }} />
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