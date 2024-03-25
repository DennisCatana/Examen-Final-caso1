import usuarios from "../models/usuarios.js";

import generarJWT from "../helpers/crearJWT.js"

const login = async (req, res) => {
    const { email, password } = req.body;

    if (Object.values(req.body).includes("")) {
        return res.status(404).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    // Buscar usuario por email
    const usuarioBD = await usuarios.findOne({ email });

    if (!usuarioBD) {
        // Si no se encuentra el usuario en la base de datos
        return res.status(404).json({ message: "Usuario no registrado" });
    }

    // Verificar si la contraseña es correcta
    if (usuarioBD.password !== password) {
        return res.status(404).json({ message: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = generarJWT(usuarioBD._id);

    // Enviar respuesta al cliente con el token JWT y el mensaje de bienvenida
    return res.status(200).json({ 
        token,
        message: `¡Bienvenido, ${usuarioBD.nombre}!`
    });


   
};

const perfil=(req,res)=>{ 
    res.status(200).json(req.usuarioBD)
}


export {
    login,
    perfil
}