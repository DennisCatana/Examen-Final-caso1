import {Router} from 'express'

import verificarAutenticacion from "../middlewares/autenticacion.js";


import {
    detalleReserva,
    registrarReserva,
    actualizarReserva,
    eliminarReserva,
    listarReservas
} from "../controllers/reservaController.js"
const router = Router()

//listar 
router.get('/reservas',verificarAutenticacion,listarReservas)
//detalle
router.get('/reservas/:id',verificarAutenticacion,detalleReserva)
//registra
router.post('/reservas/registro',verificarAutenticacion,registrarReserva)
//actualizar 
router.put('/reservas/actualizar/:id',verificarAutenticacion,actualizarReserva)
//eliminar 
router.delete('/reservas/eliminar/:id',verificarAutenticacion,eliminarReserva)


export default router