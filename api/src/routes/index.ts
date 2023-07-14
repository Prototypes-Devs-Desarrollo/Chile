import { Router } from "express";
const router = Router();
import user from './user'
import product from './product'
import imports from "./import";
import client from './client'
import bodega from './bodega'
import provider from './provider'

/* Explicón del catchedAsync()
 
  catchedAsync(argumento) espera que "argumento" sea una funcion asyncrona que tome (req, res).
  ¿Qué hace? a "argumento" le agrega un .catch automaticamente y dispara el manejador de errores de express.
  ¿Para qué? Asi nos podemos despreocuapr de hacer try catch en los controllers.
  
*/
//USER------------------    siempre abrazar controllers con catchedAsync
router.use('/v1/user', user);

//PRODUCT---------------
router.use('/v1/product', product);

//IMPORT-------------------
router.use('/v1/import', imports);

//CLIENT-------------------
router.use('/v1/client', client)

//CONTAINER----------------
router.use('/v1/provider', provider)

//EMPLOYES-----------------


//PROVEEDORES--------------


//BODEGAS------------------
router.use('/v1/bodega', bodega)

export default router;