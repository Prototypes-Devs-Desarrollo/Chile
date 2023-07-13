import { Router } from 'express'
import usersControllers from '../controllers/usersControllers';
import jwtUtils from '../middlewares/jwtUtils';

//const { limit5cada30minutos } = require('../utils/rate-limiters');

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = Router();

router.get('/data', isLoggedIn, catchedAsync(usersControllers.getOwnData));
router.put('/edit', isLoggedIn, catchedAsync(usersControllers.update));
router.post('/login', catchedAsync(usersControllers.login));
router.post('/register', catchedAsync(usersControllers.register));
router.post('/recovery', catchedAsync(usersControllers.recover));
router.post('/byemail', catchedAsync(usersControllers.findByEmail));


export default router;
