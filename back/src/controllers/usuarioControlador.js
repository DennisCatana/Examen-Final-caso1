import Usuario from "../models/usuarios.js";

import generarJWT from "../helpers/crearJWT.js"

// Método para el login
const login = async(req,res)=>{
    const {email,password} = req.body

    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    const usuarioBDD = await Usuario.findOne({email}).select(" -__v -token -updatedAt -createdAt")
        
    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    
    if (password !== usuarioBDD.password){
        return res.status(400).json({ msg: "Contraseña Incorrecta"})
    }
    
    const token = generarJWT(usuarioBDD._id)

    const {nombre,apellido,_id} = usuarioBDD
    
    res.status(200).json({
        token,
        nombre,
        apellido,
        _id,
        email:usuarioBDD.email
    })
}


// Método para mostrar el perfil 
const perfil =(req,res)=>{
    delete req.usuarioBDD.token
    delete req.usuarioBDD.createdAt
    delete req.usuarioBDD.updatedAt
    delete req.usuarioBDD.__v
    res.status(200).json(req.usuarioBDD)
}

// Exportar cada uno de los métodos
export {
    login,
    perfil
}