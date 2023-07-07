const express = require('express');
//agregar mas importaciones de ruta aca:
const user = require('./user.route');


const  catchedAsync  = require('../utils/catchedAsync');
const { checkJwt } = require('../utils/jwtUtils');
const isLoggedIn = checkJwt


const router = express.Router();
//notifications

//user GET?   Tiene q estar logeado?==checkJwt    siempre abrazarlo con catchedAsync
router.get('/api/user/user',isLoggedIn, catchedAsync(user.get_my_data));
//login not required in those:
router.post('/api/user/login', catchedAsync(user.login));
router.post('/api/user/register', catchedAsync(user.register_new));
router.post('/api/user/recovery', catchedAsync(user.recover_my_password));



module.exports = router;
