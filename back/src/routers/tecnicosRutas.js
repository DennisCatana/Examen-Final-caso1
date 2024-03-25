import {Router} from 'express'
import verificarAutenticacion from "../middlewares/autenticacion.js";
import {
    listarTecnicos,
    detalleTecnicos,
    registrarTecnicos,
    actualizarTecnicos,
    eliminarTecnicos
    
} from "../controllers/tecnicoController.js";

const router = Router()

//listar vehiculo
router.get('/tecnicos',verificarAutenticacion,listarTecnicos)
//detalle vehiculo
router.get('/tecnicos/:id',verificarAutenticacion,detalleTecnicos)
//registra vehiculo
router.post('/tecnicos/registro',verificarAutenticacion,registrarTecnicos)
//actualizar vehiculo
router.put('/tecnicos/actualizar/:id',verificarAutenticacion,actualizarTecnicos)
//eliminar vehiculo
router.delete('/tecnicos/eliminar/:id',verificarAutenticacion,eliminarTecnicos)


export default router