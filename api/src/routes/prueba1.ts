import { Router } from 'express'
import * as p1 from '../controllers/prieba1Controllers';
import jwtUtils from '../middlewares/jwtUtils';

//const { limit5cada30minutos } = require('../utils/rate-limiters');

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = Router();



router.get('/', /* isLoggedIn, */ catchedAsync(p1.obtenerPorQuery));
router.get('/:id', /* isLoggedIn, */ catchedAsync(p1.obtenerPorParams));


router.post('/', /* isLoggedIn, */ catchedAsync(p1.crear));
router.put('/', /* isLoggedIn, */ catchedAsync(p1.editar));

router.post('/flex', /* isLoggedIn, */ catchedAsync(p1.flexible));

router.post('/XDXD', /* isLoggedIn, */ catchedAsync(p1.XDXD));


router.delete('/:id', /* isLoggedIn, */ catchedAsync(p1.borrarPorParams))
router.delete('/all', /* isLoggedIn, */ catchedAsync(p1.borrarTodos))

// router.put('/', /* isLoggedIn, */ catchedAsync(p1.editar));
// router.put('/:id', /* isLoggedIn, */ catchedAsync(p1.editraPorParams));
//router.post('/', /* isLoggedIn, */ catchedAsync(p1.postById));

export default router;