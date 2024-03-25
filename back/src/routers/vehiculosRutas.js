import {Router} from 'express'
import verificarAutenticacion from "../middlewares/autenticacion.js";
import {
    listarVehiculos,
    detalleVehiculos,
    registrarVehiculos,
    actualizarVehiculos,
    eliminarVehiculos
    
} from "../controllers/vehiculoController.js";

const router = Router()

//listar vehiculo
router.get('/vehiculos',verificarAutenticacion,listarVehiculos)
//detalle vehiculo
router.get('/vehiculos/:id',verificarAutenticacion,detalleVehiculos)
//registra vehiculo
router.post('/vehiculos/registro',verificarAutenticacion,registrarVehiculos)
//actualizar vehiculo
router.put('/vehiculos/actualizar/:id',verificarAutenticacion,actualizarVehiculos)
//eliminar vehiculo
router.delete('/vehiculos/eliminar/:id',verificarAutenticacion,eliminarVehiculos)


export default router