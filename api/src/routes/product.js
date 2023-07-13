import { Router } from 'express'
import productsControllers from '../controllers/productsControllers';
import jwtUtils from '../middlewares/jwtUtils';

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = Router();

router.get('/:productId', isLoggedIn, catchedAsync(productsControllers.findById));
router.get('/byimport/:importId', isLoggedIn, catchedAsync(productsControllers.findByImportId));
router.post('/create', isLoggedIn, catchedAsync(productsControllers.createOne));
router.put('/create', isLoggedIn, catchedAsync(productsControllers.editOne));
router.delete('/delete', isLoggedIn, catchedAsync(productsControllers.deleteOne));

export default router;