import clientes from '../models/clientes.js'; 
import mongoose from "mongoose"


const listarCliente = async(req,res)=>{
    const Cliente = await clientes.find().select("-createdAt -updatedAt -__v")
    res.status(200).json(Cliente)

    
}
const detalleCliente = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el ciente ${id}`});
    const Cliente = await clientes.findById(id).select("-createdAt -updatedAt -__v")
    
    res.status(200).json(Cliente)
}
const registrarCliente = async (req, res) => {
    const { cedula, nombre, apellido, ciudad, email, direccion, telefono, fechaNacimiento } = req.body;

    try {
        // Verificar si la cédula ya existe en la base de datos
        const clienteExistente = await clientes.findOne({ cedula });
        if (clienteExistente) {
            return res.status(400).json({ mensaje: "La cédula ya está registrada" });
        }

        // Si la cédula no está registrada, crear un nuevo cliente
        const nuevoCliente = new clientes({ cedula, nombre, apellido, ciudad, email, direccion, telefono, fechaNacimiento });
        await nuevoCliente.save();
        res.status(201).json({ mensaje: "Cliente registrado exitosamente", cliente: nuevoCliente });
    } catch (error) {
        console.error("Error al registrar cliente:", error);
        res.status(500).json({ mensaje: "Ocurrió un error al registrar el cliente" });
    }
};
const actualizarCliente = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el cliente ${id}`});
    await clientes.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa del cliente"})
}
const eliminarCliente = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el cliente ${id}`})
    const clienteEliminado = await clientes.findByIdAndDelete(id);
    res.status(200).json({msg:"cliente eliminado exitosamente"})
}

export {
		 
    listarCliente,
    detalleCliente,
    registrarCliente,
    actualizarCliente,
    eliminarCliente
}