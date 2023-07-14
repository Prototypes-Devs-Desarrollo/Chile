import { Router } from 'express'
import importControllers from '../controllers/importControllers';
import jwtUtils from '../middlewares/jwtUtils';

//const { limit5cada30minutos } = require('../utils/rate-limiters');

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = Router();

router.get('/allImports', isLoggedIn, catchedAsync(importControllers.getAllImports));
router.get('/data', isLoggedIn, catchedAsync(importControllers.getOwnData));
router.put('/edit', isLoggedIn, catchedAsync(importControllers.update));
router.post('/create', isLoggedIn, catchedAsync(importControllers.create));
router.delete('/delete', isLoggedIn, catchedAsync(importControllers.deleteOne));

export default router;
