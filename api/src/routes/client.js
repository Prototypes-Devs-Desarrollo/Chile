import { Router } from 'express'
import clientControllers from '../controllers/clientControllers';
import jwtUtils from '../middlewares/jwtUtils';

//const { limit5cada30minutos } = require('../utils/rate-limiters');

const { catchedAsync } = require('../utils');
const isLoggedIn = jwtUtils.checkJwt

const router = Router();

router.get('/getAll', isLoggedIn, catchedAsync(clientControllers.getAll));
router.get('/data', isLoggedIn, catchedAsync(clientControllers.getOwnData));
router.put('/edit', isLoggedIn, catchedAsync(clientControllers.update));
router.post('/create',catchedAsync(clientControllers.create));
router.delete('/delete', isLoggedIn, catchedAsync(clientControllers.deleteClient))
router.post("/relbase-bulk",catchedAsync(clientControllers.bulkToRellbase))
export default router;