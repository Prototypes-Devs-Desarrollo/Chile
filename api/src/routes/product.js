import { Router } from 'express'
import productsControllers from '../controllers/productsControllers';
import jwtUtils from '../middlewares/jwtUtils';

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = Router();

router.get('/getAll', catchedAsync(productsControllers.getAll));
router.get('/:codigo', isLoggedIn, catchedAsync(productsControllers.findById)); // REFACTORIZADO
router.get('/byimport/:importId', isLoggedIn, catchedAsync(productsControllers.findByImportId));
router.post('/create', isLoggedIn, catchedAsync(productsControllers.createOne)); // REFACTORIZADO
router.put('/edit', isLoggedIn, catchedAsync(productsControllers.editOne)); // REFACTORIZADO
router.delete('/delete', isLoggedIn, catchedAsync(productsControllers.deleteOne)); // REFACTORIZADO
router.delete('/all', catchedAsync(productsControllers.findAll)); // REFACTORIZADO
router.post("/relbase-bulk",catchedAsync(productsControllers.bulkToRellbase))

export default router;