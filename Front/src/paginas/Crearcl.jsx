import React from 'react'
import { Formulario, FormularioCl } from '../componets/Perfil/FormularioCl'
//import { Formulario } from '../../../Formulario'

const Crear = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Agregar...</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar un nuevo .....</p>
            <FormularioCl />
        </div>
    )
}

export default Crear