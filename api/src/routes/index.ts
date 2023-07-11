import express from 'express'
//agregar mas importaciones de ruta aca:
import usersControllers from '../controllers/usersControllers';
import jwtUtils from '../middlewares/jwtUtils';

const { limit5cada30minutos } = require('../utils/rate-limiters');

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = express.Router();

//USER------------------    siempre abrazarlo con catchedAsync
router.get('/v1/user/data', isLoggedIn, catchedAsync(usersControllers.getOwnData));
router.put('/v1/user/edit', catchedAsync(usersControllers.update));
router.post('/v1/user/login', catchedAsync(usersControllers.login));
router.post('/v1/user/register', catchedAsync(usersControllers.register));
router.post('/v1/user/recovery', catchedAsync(usersControllers.recover));
router.post('/v1/user/byemail', catchedAsync(usersControllers.findByEmail));


/* Explicón------------------------
 
  catchedAsync(argumento) espera que "argumento" sea una funcion asyncrona que tome (req, res).
  ¿Para qué? porque, al pasar a través de es función, le pone un .catch automaticamente y maneja el error.
  
*/


export default router;
