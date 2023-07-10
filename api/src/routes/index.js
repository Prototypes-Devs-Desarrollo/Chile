const express = require('express');
//agregar mas importaciones de ruta aca:
const user = require('./user.route');


const { limit5cada30minutos } = require('../utils/rate-limiters');

const { catchedAsync } = require('../utils');
const { checkJwt } = require('../utils/jwtUtils');

const isLoggedIn = checkJwt


const router = express.Router();
/* Explicón  catchedAsync
  catchedAsync(argumento) espera que "argumento" sea una funcion asyncrona que tome (req, res).
  ¿Para qué? porque, al pasar a través de es función, le pone un .catch automaticamente y maneja el error. 
*/

//user GET
router.get('/v1/user/data', isLoggedIn, catchedAsync(user.get_my_data));

//login not required in those:
router.post('/v1/user/login', catchedAsync(user.login));
router.post('/v1/user/register', catchedAsync(user.register));
router.post('/v1/user/recover', catchedAsync(user.recover_my_password));




module.exports = router;
