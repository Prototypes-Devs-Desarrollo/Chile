import express from 'express'
//agregar mas importaciones de ruta aca:
import usersControllers from '../controllers/usersControllers';
import jwtUtils from '../middlewares/jwtUtils';
import productsControllers from '../controllers/productsControllers';

const { limit5cada30minutos } = require('../utils/rate-limiters');

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = express.Router();
/* Explicón del catchedAsync()
 
  catchedAsync(argumento) espera que "argumento" sea una funcion asyncrona que tome (req, res).
  ¿Qué hace? a "argumento" le agrega un .catch automaticamente y dispara el manejador de errores de express.
  ¿Para qué? Asi nos podemos despreocuapr de hacer try catch en los controllers.
  
*/
//USER------------------    siempre abrazar controllers con catchedAsync
router.get('/v1/user/data', isLoggedIn, catchedAsync(usersControllers.getOwnData));
router.put('/v1/user/edit', catchedAsync(usersControllers.update));
router.post('/v1/user/login', catchedAsync(usersControllers.login));
router.post('/v1/user/register', catchedAsync(usersControllers.register));
router.post('/v1/user/recovery', catchedAsync(usersControllers.recover));
router.post('/v1/user/byemail', catchedAsync(usersControllers.findByEmail));

//PRODUCT------------------  
router.get('/v1/product/:productId', isLoggedIn, catchedAsync(productsControllers.findById));
router.get('/v1/product/byimport/:importId', isLoggedIn, catchedAsync(productsControllers.findByImportId));
router.post('/v1/product/create', isLoggedIn, catchedAsync(productsControllers.createOne));
router.put('/v1/product/create', isLoggedIn, catchedAsync(productsControllers.editOne));
router.delete('/v1/product/delete', isLoggedIn, catchedAsync(productsControllers.deleteOne));





export default router;
