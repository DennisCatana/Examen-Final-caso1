import tecnicos from '../models/tecnicos.js'; 
import mongoose from "mongoose"

const listarTecnicos = async(req,res)=>{
    const Tecnico = await tecnicos.find().select("-createdAt -updatedAt -__v")
    res.status(200).json(Tecnico)
}

const detalleTecnicos = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el técnico ${id}`});
    const Tecnico = await tecnicos.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(Tecnico)
}

const registrarTecnicos = async (req,res)=>{
        // Desestructurar el cuerpo de la solicitud
        const {nombre, apellido, cedula, fechaNacimiento, genero, ciudad, direccion, telefono,email } = req.body;
        try {
            // Verificar si la cédula ya existe en la base de datos
            const tecnicoExistente = await tecnicos.findOne({ cedula });
            if (tecnicoExistente) {
                return res.status(400).json({ mensaje: "La cédula ya está registrada" });
            }
    
            // Si la cédula no está registrada, crear un nuevo cliente
            const nuevoTecnico = new tecnicos({ nombre, apellido, cedula, fechaNacimiento, genero, ciudad, direccion, telefono,email });
            await nuevoTecnico.save();
            res.status(201).json({ mensaje: "Cliente registrado exitosamente", tecnico: nuevoTecnico });
        } catch (error) {
            console.error("Error al registrar cliente:", error);
            res.status(500).json({ mensaje: "Ocurrió un error al registrar el cliente" });
        }
}

const actualizarTecnicos = async (req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el tecnico ${id}`});
    await tecnicos.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa del tecnico"})
}

const eliminarTecnicos = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el vehiculo ${id}`})
    const tecnicosEliminado = await tecnicos.findByIdAndDelete(id);
    res.status(200).json({msg:"tecnico eliminado exitosamente"})
}

export {
    listarTecnicos,
    detalleTecnicos,
    registrarTecnicos,
    actualizarTecnicos,
    eliminarTecnicos
}