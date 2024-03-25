import {Router} from 'express'

import verificarAutenticacion from "../middlewares/autenticacion.js";


import {
    listarTikets,
    detalletikets,
    registrartiket,
    actualizartiket,
    eliminartikets
} from "../controllers/tiketsController.js"
const router = Router()

//listar 
router.get('/tikets',verificarAutenticacion,listarTikets)
//detalle
router.get('/tikets/detalle/:id',verificarAutenticacion,detalletikets)
//registra
router.post('/tikets/registro',verificarAutenticacion,registrartiket)
//actualizar 
router.put('/tikets/actualizar/:id',verificarAutenticacion,actualizartiket)
//eliminar 
router.delete('/tikets/eliminar/:id',verificarAutenticacion,eliminartikets)


export default router