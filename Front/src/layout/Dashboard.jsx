import { Link,  Navigate,Outlet, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'


const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname

    const { auth} = useContext(AuthContext)
    const autenticado = localStorage.getItem('token')
    
    return (
        <div className='md:flex md:min-h-screen'>

            <div className='md:w-1/5 bg-gray-800 px-5 py-4'>

                <h2 className='text-4xl font-black text-center text-slate-200'>APP-DEMO</h2>

                

                <ul className="mt-5">

                    {/*<li className="text-center">
                        <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Perfil</Link>
    </li>*/}

                    <li className="text-center">
                        <Link to='/dashboard/clientes' className={`${urlActual === '/dashboard/clientes' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Clientes</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/tecnicos' className={`${urlActual === '/dashboard/vehiculos' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Técnicos</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/tickets' className={`${urlActual === '/dashboard/tickets' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Tickets</Link>
                    </li>
                </ul>

            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='bg-gray-800 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-slate-100'>
                        Bienvenido - {auth?.nombre}
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-green-600 rounded-full" width={50} height={50} />
                    </div>
                    <div>
                        <Link to='/login' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                        bg-red-800 px-4 py-1 rounded-lg"onClick={()=>{localStorage.removeItem('token')}}>Salir</Link>
                    </div>
                </div>
                <div className='overflow-y-scroll p-8'>
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>
                <div className='bg-gray-800 h-12'>
                    <p className='text-center  text-slate-100 leading-[2.9rem] underline'>Todos los derechos reservados</p>
                </div>

            </div>



        </div>
    )
}

export default Dashboard