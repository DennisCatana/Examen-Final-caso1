import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mensaje from "../Alertas/Mensaje";


export const FormularioRs = ({reserva}) => {
    
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({})
    const [reservas, setReservas] = useState([]);
    const [clientesIds, setClientesIds] = useState([]);
    const [tecnicosIds, settecnicosIds] = useState([]);

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
            const url = `${import.meta.env.VITE_BACKEND_URL}/tecnicos`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            const tecnicosIdsArray = respuesta.data.map(tecnico => tecnico._id);
            settecnicosIds(tecnicosIdsArray);

        } catch (error) {
            console.error("Error al listar tecnicos:", error);
        }
    };

    useEffect(() => {
        listarIDsCl();
        listarIDsVh();
    }, []);

    const [form, setform] = useState({
        codigo: reserva?.codigo ??"",
        descripcion: reserva?.descripcion ??"",
        idCliente: reserva?.idCliente._id ??"",
        
        idVehiculo: reserva?.idtecnico._id ??"",
        
    })

    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => { 
        e.preventDefault()
        if (reserva?._id) {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/tikets/actualizar/${reserva?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/tickets')
        }
        else {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/tikets/registro`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post(url,form,options)
						setMensaje({ respuesta:"registrada exitosamente", tipo: true })
            setTimeout(() => {
                navigate('/dashboard/tickets');
            }, 3000);
        } catch (error) {
						setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
        }
    }

    return (
                 
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
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
                        value={form.codigo}
                        onChange={handleChange}
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
                        value={form.descripcion}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className='text-gray-700 uppercase font-bold text-sm'>ID Cliente: </label>
                    <select className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5' 
                    name='idCliente'
                    value={form.idCliente}
                    onChange={handleChange}>
                        <option value="">--- Seleccionar ---</option>
                        {clientesIds.map(clienteId => (
                            <option key={clienteId} value={clienteId}>{clienteId}</option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className='text-gray-700 uppercase font-bold text-sm'>ID tecnico: </label>
                    <select className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5' 
                    name='idVehiculo'
                    value={form.idtecnico}
                    onChange={handleChange}>
                        <option value="">--- Seleccionar ---</option>
                        {tecnicosIds.map(tecnicoId => (
                            <option key={tecnicoId} value={tecnicoId}>{tecnicoId}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className='bg-gray-600 w-full p-3  text-slate-300 uppercase font-bold rounded-lg 
                hover:bg-gray-900 cursor-pointer transition-all'
                value={reserva?._id ? 'Actualizar ticket' : 'Registrar ticket'}  />
            </form>
        
    )
}