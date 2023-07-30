import { Router } from 'express'
import contenedoresControllers from '../controllers/contenedoresControllers'
import jwtUtils from '../middlewares/jwtUtils';

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = Router();

router.post('/create', isLoggedIn, catchedAsync(contenedoresControllers.createOne));
router.get('/all', isLoggedIn, catchedAsync(contenedoresControllers.findAll));
router.get('/:id', isLoggedIn, catchedAsync(contenedoresControllers.findId));

// router.post('/', /* isLoggedIn, */ catchedAsync(p1.crear));
// router.put('/', /* isLoggedIn, */ catchedAsync(p1.editar));

// router.post('/flex', /* isLoggedIn, */ catchedAsync(p1.flexible));

// router.post('/XDXD', /* isLoggedIn, */ catchedAsync(p1.XDXD));


// router.delete('/:id', /* isLoggedIn, */ catchedAsync(p1.borrarPorParams))
// router.delete('/all', /* isLoggedIn, */ catchedAsync(p1.borrarTodos))

// router.put('/', /* isLoggedIn, */ catchedAsync(p1.editar));
// router.put('/:id', /* isLoggedIn, */ catchedAsync(p1.editraPorParams));
//router.post('/', /* isLoggedIn, */ catchedAsync(p1.postById));

export default router;