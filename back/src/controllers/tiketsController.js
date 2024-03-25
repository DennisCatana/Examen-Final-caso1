// IMPORTAR EL MODELO
import Tiket from "../models/tikets.js";
import mongoose from "mongoose";

// Método para registrar una cita
const registrartiket = async (req, res) => {
    const { codigo } = req.body;
    if (!codigo) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }
    try {
        // Verificar si la cita ya está registrada
        const tiketExistente = await Tiket.findOne({ codigo });
        if (tiketExistente) {
            return res.status(400).json({ msg: "Lo sentimos, la cita ya se encuentra registrada" });
        }
        // Crear una nueva instancia de Cita
        const nuevoTiket = new Tiket(req.body);
        // Guardar la nueva especialidad en la base de datos
        await nuevoTiket.save();
        // Respuesta de éxito
        res.status(200).json({ msg: "Registro exitoso de la especialidad" });
    } catch (error) {
        res.status(500).json({ msg: 'Ocurrió un error al intentar registrar la cita', error: error.message });
    }
};


// Método para listar todas las citas
const listarTikets = async (req, res) => {
    const tikets = await tikets.find({estado:true})
    .where('Tecnico').equals(req.tecnicodBDD)
    .where('Cliente').equals(req.clienteBDD)
    .select("-salida -createdAt -updatedAt -__v")
    .populate('tecnico', '_id nombre apellido') //Respuesta
    .populate('cliente', '_id nombre apellido')    // Respuesta 

    res.status(200).json(citas)
}

// Método para actualizar una cita por su ID
const actualizartiket = async (req, res) => {
    const {id} = req.params;
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"});
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no existe el tiket con el ID ${id}`});
    await Tiket.findByIdAndUpdate(id, req.body);
    res.status(200).json({msg:"Actualización exitosa de la cita"});
}


// Método para eliminar una cita por su ID
const eliminartikets = async (req, res) => {
    const { id } = req.params;
    try {
        // Verificar si el ID proporcionado es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: `Lo sentimos, el ID proporcionado no es válido` });
        }
        const tiket = await Tiket.findByIdAndDelete(id);
        if (!tiket) {
            return res.status(404).json({ msg: `Lo sentimos, no se encontró ningúna cita con el ID ${id}` });
        }
        res.status(200).json({ msg: "Cita eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: 'Ocurrió un error al intentar eliminar la cita', error: error.message });
    }
}

export {
    listarTikets,
    registrartiket,
    actualizartiket,
    eliminartikets
};
