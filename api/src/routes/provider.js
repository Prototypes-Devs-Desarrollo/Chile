import { Router } from 'express'
import providerControllers from '../controllers/providerControllers';
import jwtUtils from '../middlewares/jwtUtils';

//const { limit5cada30minutos } = require('../utils/rate-limiters');

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = Router();

router.get('/all', isLoggedIn, catchedAsync(providerControllers.getAll));
router.get('/data', isLoggedIn, catchedAsync(providerControllers.getOwnData));
router.put('/update', isLoggedIn, catchedAsync(providerControllers.update))
router.post('/create', isLoggedIn, catchedAsync(providerControllers.createOne));
router.delete('/delete', isLoggedIn, catchedAsync(providerControllers.deleteOne))

export default router