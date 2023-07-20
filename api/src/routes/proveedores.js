import { Router } from 'express';
import proveedoresControllers from '../controllers/proveedoresControllers';
import jwtUtils from '../middlewares/jwtUtils';

//const { limit5cada30minutos } = require('../utils/rate-limiters');

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt;

const router = Router();

router.get('/all', isLoggedIn, catchedAsync(proveedoresControllers.getAll));
router.get('/data', isLoggedIn, catchedAsync(proveedoresControllers.getOwnData));
router.put('/update', isLoggedIn, catchedAsync(proveedoresControllers.update));
router.post('/create', isLoggedIn, catchedAsync(proveedoresControllers.createOne));
router.delete('/delete', isLoggedIn, catchedAsync(proveedoresControllers.deleteOne));

export default router;
