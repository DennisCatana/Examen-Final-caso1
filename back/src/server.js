// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerUsuario from './routers/usuariosRutas.js'
import routerCliente from './routers/clienteRutas.js'
import routerTiket from './routers/tiketsRutas.js'
import routerTecnico from './routers/tecnicosRutas.js'



// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Variables globales


// Rutas 
app.use('/api',routerUsuario)
app.use('/api',routerCliente)
app.use('/api',routerTiket)
app.use('/api',routerTecnico)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportar la instancia de express por medio de app
export default  app
