import {Router} from 'express';
import verificarAutenticacion from '../middlewares/autenticacion.js';

import {
    login,
    perfil
}from "../controllers/usuarioControlador.js";

const router = Router()

router.post('/login',login)
router.get('/perfil',verificarAutenticacion,perfil)

export default router