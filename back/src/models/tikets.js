import mongoose, {Schema,model} from 'mongoose'
//import {Schema, model} from 'mongoose'

const tiketsSchema = new Schema({
    codigo: {
        type: Number,
        required: true,
        trim: true,
    }, 
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    idCliente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'clientes'
    },
    idtecnico:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tecnico'
    }
    
    
},{
    timestamps:true
})



export default model('tikets',tiketsSchema)