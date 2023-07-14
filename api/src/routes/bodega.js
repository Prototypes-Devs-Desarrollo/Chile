import { Router } from 'express'
import bodegaControllers from '../controllers/bodegaControllers';
import jwtUtils from '../middlewares/jwtUtils';

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = Router();

router.get('/getAll', isLoggedIn, catchedAsync(bodegaControllers.getAll));
// router.get('/data', isLoggedIn, catchedAsync(bodegaControllers.getOwnData));
// router.put('/edit', isLoggedIn, catchedAsync(bodegaControllers.update));
router.post('/create', isLoggedIn, catchedAsync(bodegaControllers.create));
// router.delete('/delete', isLoggedIn, catchedAsync(bodegaControllers.deleteBodega))

export default router;