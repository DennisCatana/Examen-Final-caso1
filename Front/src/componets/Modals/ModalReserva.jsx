import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalReserva = ({ }) => {
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([]);
    const [clientesIds, setClientesIds] = useState([]);
    const [vehiculosIds, setVehiculosIds] = useState([]);

    const listarIDsCl = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/clientes`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            const clientesIdsArray = respuesta.data.map(cliente => cliente._id);
            setClientesIds(clientesIdsArray);
        } catch (error) {
            console.error("Error al listar clientes:", error);
        }
    };

    const listarIDsVh = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            const vehiculosIdsArray = respuesta.data.map(vehiculo => vehiculo._id);
            setVehiculosIds(vehiculosIdsArray);

        } catch (error) {
            console.error("Error al listar vehículos:", error);
        }
    };

    useEffect(() => {
        listarIDsCl();
        listarIDsVh();
    }, []);

    return (
        <div >
            <h1 className='text-gray uppercase font-bold text-lg text-center mt-4'>Reservas</h1>
            <form className='p-10'>
                <div>
                    <label
                        htmlFor='codigo'
                        className='text-gray-700 uppercase font-bold text-sm'>Código: </label>
                    <input
                        id='codigo'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='número decodigo de la reserva'
                        name='codigo'
                    />
                </div>

                <div>
                    <label
                        htmlFor='descripcion'
                        className='text-gray-700 uppercase font-bold text-sm'>Descripción: </label>
                    <input
                        id='descripcion'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='descripcion'
                        name='descripcion'
                    />
                </div>

                <div>
                    <label className='text-gray-700 uppercase font-bold text-sm'>ID Cliente: </label>
                    <select className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5' name='idCliente'>
                        <option value="">--- Seleccionar ---</option>
                        {clientesIds.map(clienteId => (
                            <option key={clienteId} value={clienteId}>{clienteId}</option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className='text-gray-700 uppercase font-bold text-sm'>ID Vehículo: </label>
                    <select className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5' name='idVehiculo'>
                        <option value="">--- Seleccionar ---</option>
                        {vehiculosIds.map(vehiculoId => (
                            <option key={vehiculoId} value={vehiculoId}>{vehiculoId}</option>
                        ))}
                    </select>
                </div>

                <input
                type="submit"
                className='bg-gray-600 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-900 cursor-pointer transition-all'
                value='Registrar Vehiculo' />
            </form>
        </div>
    )
}

export default ModalReserva;
