import jwt from 'jsonwebtoken';
import usuarios from "../models/usuarios.js";

const verificarAutenticacion = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(404).json({ msg: "Lo sentimos, debes proporcionar un token" });
    }

    const { authorization } = req.headers;

    try {
        const { id } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);
        // No se verifica ningún rol específico, simplemente se busca al usuario por su ID
        req.usuarioBD = await usuarios.findById(id).lean().select("-password");
        next();
    } catch (error) {
        return res.status(404).json({ msg: "Formato del token no válido" });
    }
};

export default verificarAutenticacion;