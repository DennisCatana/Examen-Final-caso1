import mongoose, {Schema,model} from 'mongoose'
//import {Schema, model} from 'mongoose'



const tecnicosSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    }, 
    cedula: {
        type: String,
        required: true,
        trim: true,
    },
    fechaNacimiento: {
        type: String,
        required: true,
        trim: true,
    },
    genero: {
        type: String,
        required: true,
        trim: true,
    },
    ciudad: {
        type: String,
        required: true,
        trim: true,
    },
    direccion: {
        type: String,
        required: true,
        trim: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    tikets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'tikets'
        }
    ],
},{
    timestamps:true
})



export default model('tecnicos',tecnicosSchema)