import axios from 'axios'
import {Link} from 'react-router-dom'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensaje'
import AuthContext from '../context/AuthProvider'





const Login = () => {
    
    const navigate = useNavigate()
    const {auth, setAuth,setEstado} = useContext(AuthContext)
    const [mensaje, setMensaje] = useState({})

    const [form, setform] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

	const handleSubmit = async(e) => { 
	        e.preventDefault()
	        try {
	            const url = `${import.meta.env.VITE_BACKEND_URL}/login`
	            const respuesta= await axios.post(url,form)
	            localStorage.setItem('token',respuesta.data.token)
	            setAuth(respuesta.data)
	            navigate('/dashboard/clientes')
	        } catch (error) {
	            setMensaje({respuesta:error.response.data.msg,tipo:false})
	            setform({})
	            setTimeout(() => {
	                setMensaje({})
	            }, 3000);
	        }
	 }



    
   
    
    //const {setAuth,setEstado} = useContext(AuthContext)
    
    

	

    return (
        <>
            <div className="w-1/2 h-screen bg-white flex justify-center items-center">
                
                <div className="md:w-4/5 sm:w-full">
                {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Bienvenido</h1>
                    <small className="text-gray-400 block my-4 text-sm text-center" >Ingreso</small>


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Correo</label>
                            <input type="email" placeholder="Ingrese su correo" 
                             name='email'
                             value={form.email || ""} onChange={handleChange}
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                            <input type="password" placeholder="********************" 
                             name='password'
                             value={form.password || ""} onChange={handleChange}className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="my-4">
                        <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Ingresar</button>
                        </div>

                    </form>

                    


                </div>
            </div>
        </>
    )
}

export default Login