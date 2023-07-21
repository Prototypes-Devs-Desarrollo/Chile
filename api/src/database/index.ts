import mongoose from 'mongoose';

import usersSchema from './schemas/usersSchema'; //1
import productsSchema from './schemas/productsSchema'; //2
import proveedoresSchema from './schemas/proveedoresSchema'; //3
import importsSchema from './schemas/importsSchema'; //4
import clientsSchema from './schemas/clientsSchema'; //5
import bodegasSchema from './schemas/bodegasSchema'; //6
import contenedoresSchema from './schemas/contenedoresSchema'; //7
import prueba1Schema from './schemas/prueba1Schema'; //8

import ordenesSchema from './schemas/ordenesSchema'; //9

mongoose.set('strictQuery', true); //ver sies necesario

const deploy = 'mongodb://mongo:2SCyrbD7AwV4tITrjbOA@containers-us-west-186.railway.app:7092';

const conn = mongoose.createConnection(deploy);

export const users = conn.model('users', usersSchema); //1
export const products = conn.model('products', productsSchema); //2  // REFACTORIZADO
export const proveedores = conn.model('proveedores', proveedoresSchema); //3 // REFACTORIZADO
export const imports = conn.model('imports', importsSchema); //4
export const clients = conn.model('clients', clientsSchema); //5 // REFACTORIZADO
export const bodegas = conn.model('bodegas', bodegasSchema); //6
export const contenedores = conn.model('containers', contenedoresSchema); //7
export const prueba1 = conn.model('prueba1', prueba1Schema); //8

export const ordenes = conn.model('ordenes', ordenesSchema); //9

//solo para testear, borrar si querer:
// try {
//     const aasd = new containers({})
//     aasd.id="ideContainer"
//     aasd.nombre="hay"
//     aasd.clientes =[{id:"ide",nombre:"El Cliente",productos: [{id:"idprod",nombre:"nomprod",responsable: {id:"iresp",correo:"email",nombre:"taipscript"}}]}]
//     aasd.save()
// } catch (error) {
//     console.log(error.message);

// }

//characters.find().populate("films", ["_id", "title"]).then(log);
