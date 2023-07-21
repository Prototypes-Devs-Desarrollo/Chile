import { Router } from "express";
const router = Router();
import user from './user'
import product from './product'
import imports from "./import";
import client from './client'
import bodega from './bodega'

import prueba1 from './prueba1'
import proveedores from './proveedores'
import ordenes from './ordenes'
import contenedor from './contenedor'

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

//PROVEEDORES----------------
router.use('/v1/proveedores', proveedores)

//PRUEBAS -------------------
router.use('/v1/prueba1', prueba1);

//EMPLOYES-----------------


//CONTENEDORES--------------
router.use('/v1/contenedor', contenedor)


//BODEGAS------------------
router.use('/v1/bodega', bodega)

//OREDENES DE COMPRA--------------
router.use('/v1/orden', ordenes)

export default router;