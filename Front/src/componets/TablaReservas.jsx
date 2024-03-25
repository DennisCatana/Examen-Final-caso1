import React, { useEffect, useState } from "react";
import axios from 'axios';
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from 'react-router-dom';

const TablaReservas = () => {
    const navigate = useNavigate();
    
    const [reservas, setReservas] = useState([]);

    const listarReservas = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/reservas`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            setReservas(respuesta.data);
            const clientesIdsArray = respuesta.data.map(reserva => reserva.idCliente._id);
        console.log("IDs de clientes:", clientesIdsArray);
        } catch (error) {
            console.error("Error al listar reservas:", error);
        }
    };

    useEffect(() => {
        listarReservas();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("Vas a eliminar una reserva, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/reservas/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                const data = {
                    salida: new Date().toString()
                };
                await axios.delete(url, { headers, data });
                listarReservas();
            }
        } catch (error) {
            console.error("Error al eliminar reserva:", error);
        }
    };

    return (
        <>
            {reservas.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <table className='w-full mt-5 table-auto shadow-lg bg-white'>
                    <thead className='bg-gray-800 text-slate-400'>
                        <tr>
                            <th className='p-2'>N°</th>
                            <th className='p-2'>Codigo</th>
                            <th className='p-2' style={{ width: '200px' }}>Descripción</th>
                            <th className='p-2'>idCliente</th>
                            <th className='p-2'>Cliente</th>
                            <th className='p-2'>idVehículo</th>
                            <th className='p-2'>Vehículo</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva, index) => (
                            <tr className="border-b hover:bg-gray-300 text-center" key={reserva._id}>
                                <td>{index + 1}</td>
                                <td>{reserva.codigo}</td>
                                <td>{reserva.descripcion}</td>
                                <td>{`${reserva.idCliente._id}`}</td>
                                <td>{`${reserva.idCliente.nombre} ${reserva.idCliente.apellido}`}</td>
                                <td>{`${reserva.idVehiculo._id}`}</td>
                                <td>{`${reserva.idVehiculo.marca} ${reserva.idVehiculo.modelo} (${reserva.idVehiculo.placa})`}</td>
                                <td className='py-2 text-center'>
                                    <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"  onClick={() => navigate(`/dashboard/visualizarReserva/${reserva._id}`)}/>
                                    <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"  onClick={() => navigate(`/dashboard/actualizarReserva/${reserva._id}`)}  /> 
                                    <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" onClick={() => handleDelete(reserva._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default TablaReservas;
