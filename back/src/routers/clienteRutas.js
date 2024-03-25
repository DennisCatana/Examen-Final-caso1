import {Router} from 'express'
import verificarAutenticacion from "../middlewares/autenticacion.js";
import{listarCliente,
    detalleCliente,
    registrarCliente,
    actualizarCliente,
    eliminarCliente} from "../controllers/clienteControlador.js";




const router = Router()

//listar cliente
router.get('/clientes',verificarAutenticacion,listarCliente)
//detalle cliente
router.get('/clientes/:id',verificarAutenticacion,detalleCliente)
//registra cliente
router.post('/clientes/registro',verificarAutenticacion,registrarCliente)
//actualizar cliente
router.put('/cliente/actualizar/:id',verificarAutenticacion,actualizarCliente)
//eliminar cliente
router.delete('/cliente/eliminar/:id',verificarAutenticacion,eliminarCliente)

export default router