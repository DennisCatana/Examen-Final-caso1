import React, { useEffect, useState } from "react";
import axios from 'axios';
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from 'react-router-dom';

const TablaReservas = () => {
    const navigate = useNavigate();
    
    const [tickets, setTickets] = useState([]);

    const listarReservas = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/tikets`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            setTickets(respuesta.data);
            const clientesIdsArray = respuesta.data.map(tickets => tickets.idCliente._id);
        console.log("IDs de clientes:", clientesIdsArray);
        } catch (error) {
            console.error("Error al listar tickets:", error);
        }
    };

    useEffect(() => {
        listarReservas();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("Vas a eliminar un ticket, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/tikets/eliminar/${id}`;
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
            console.error("Error al eliminar tickte:", error);
        }
    };

    return (
        <>
            {tickets.length === 0 ? (
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
                           
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((tickets, index) => (
                            <tr className="border-b hover:bg-gray-300 text-center" key={tickets._id}>
                                <td>{index + 1}</td>
                                <td>{tickets.codigo}</td>
                                <td>{tickets.descripcion}</td>
                                <td>{`${tickets.idCliente._id}`}</td>
                                <td>{`${tickets.idCliente.nombre} ${tickets.idCliente.apellido}`}</td>
                                
                                

                                {/*
                                <td>{`${tickets.idtecnico._id}`}</td>
                                <td>{`${tickets.idtecnico.nombre} `}</td>
                                
                                
                                */}
                                
                                {/*
                                
                                */}
                                
                                <td className='py-2 text-center'>
                                    <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"  onClick={() => navigate(`/dashboard/visualizartickets/${tickets._id}`)}/>
                                    <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"    /> 
                                    <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" onClick={() => handleDelete(tickets._id)} />
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
