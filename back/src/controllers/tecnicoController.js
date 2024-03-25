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
    const { id } = req.body;
    // Validar que se llenen todos los campos
    if (!id) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }
    try {
        // Verificar si el tecnico ya está registrada
        const tecnicoExistente = await Tecnico.findOne({ codigo });
        if (tecnicoExistente) {
            return res.status(400).json({ msg: "Lo sentimos, la especialidad ya se encuentra registrada" });
        }
        // Crear una nueva instancia de Especialidad
        const nuevoTecnico = new Tecnico(req.body)
        //Asociar la especialidad al doctor
        nuevoTecnico.doctor=req.usuarioBDD._id
        // Guardar la nueva especialidad en la base de datos
        await nuevoTecnico.save();
        // Respuesta de éxito
        res.status(200).json({ msg: "Registro exitoso de la especialidad" });
    } catch (error) {
        res.status(500).json({ msg: 'Ocurrió un error al intentar registrar al técnico', error: error.message });
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