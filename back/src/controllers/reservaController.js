import reservas from "../models/reservas.js";
import mongoose from "mongoose"

const detalleReserva = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la reserva`});
    const Reserva = await reservas.findById(id)
    .populate('idCliente', '_id nombre')
    .populate('idVehiculo', '_id marca modelo');
    res.status(200).json(Reserva)
}
const registrarReserva = async(req,res)=>{
        // Extraer los datos necesarios de la solicitud
        const { codigo, descripcion, idCliente, idVehiculo } = req.body;

        // Verificar si el código ya está en uso
        const verificarCodigoReserva = await reservas.findOne({ codigo });

        if (verificarCodigoReserva) {
            return res.status(400).json({ mensaje: "El código de reserva ya está existe" });
        }

        // Verificar si los IDs de cliente y vehículo proporcionados son válidos
        if (!mongoose.Types.ObjectId.isValid(idCliente) || !mongoose.Types.ObjectId.isValid(idVehiculo)) {
            return res.status(400).json({ mensaje: "Los IDs de cliente y vehículo deben ser válidos" });
        }

        // Crear una nueva instancia de reserva utilizando los datos de la solicitud
        const nuevaReserva = new reservas({
            codigo,
            descripcion,
            idCliente,
            idVehiculo
        });

        // Guardar la reserva en la base de datos
        await nuevaReserva.save();

        // Responder al cliente con un mensaje de éxito
        res.status(201).json({ mensaje: "Reserva registrada exitosamente", reserva: nuevaReserva });
    
}
const actualizarReserva = async (req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la reserva ${id}`});
    await reservas.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa de la reserva"})
}
const eliminarReserva = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la reserva `})
    await reservas.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Reserva eliminada exitosamente"})
}
const listarReservas = async(req,res)=>{
    const Reservas = await reservas.find()
    .populate('idCliente', 'nombre apellido')
    .populate('idVehiculo', 'marca modelo placa')
    .select ("-createdAt -updatedAt -__v");
    res.status(200).json(Reservas)
}

export {
    detalleReserva,
    registrarReserva,
    actualizarReserva,
    eliminarReserva,
    listarReservas
    
}