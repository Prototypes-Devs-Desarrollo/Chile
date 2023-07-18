import { Schema } from "mongoose";
import { toJSON } from "./plugins";

// const importa = [
//   {
//     id: 1,
//     clientes: [
//       {
//         id: 1,
//         otroddatos: '',
//         productoId: [
//           {
//             id: 1,
//             proveedorId: {
//               losdatos: 'datos de mierda a agregar'
//             },
//             responsableId: {
//               lodasto: 'datos de mierda a agregar'
//             }
//           },
//           {
//             id: 2,
//             proveedorId: {
//               losdatos: 'datos d emierda'
//             },
//             responsableId: {
//               lodasto: 'datos de mierda a agregar'
//             }
//           }
//         ]
//       },
//       {
//         id: 1,
//         otroddatos: '',
//         productoId: [
//           {
//             id: 2,
//             proveedorId: {
//               losdatos: 'datos d emierda'
//             },
//             responsableId: {
//               lodasto: 'datos de mierda a agregar'
//             }
//           }
//         ]
//       }
//     ]
//   }
// ]

// const impoirtacion = {
//   id: 1,
//   clientes: [
//     {
//       id: 1,
//       otroddatos: '',
//       productoId: [
//         {
//           id: 1,
//           proveedorId: {
//             losdatos: 'datos de mierda a agregar'
//           },
//           responsableId: {
//             lodasto: 'datos de mierda a agregar'
//           }
//         },
//         {
//           id: 2,
//           proveedorId: {
//             losdatos: 'datos d emierda'
//           },
//           responsableId: {
//             lodasto: 'datos de mierda a agregar'
//           }
//         }
//       ]
//     },
//     {
//       id: 1,
//       otroddatos: '',
//       productoId: [
//         {
//           id: 2,
//           proveedorId: {
//             losdatos: 'datos d emierda'
//           },
//           responsableId: {
//             lodasto: 'datos de mierda a agregar'
//           }
//         }
//       ]
//     }
//   ]
// }

const importsSchema = new Schema({
  /* _id: String, */
  importDetails:  {type:Array},
})


// function y no arrow, porque vamos a usar el this.
importsSchema.statics.list = async function () {
  return await this.find()
    .populate("productos", ["_id", "name"])
    .populate("responsables", ["_id", "name"])
    .populate("destino.bodega", ["_id", "name"])
    .populate("destino.cliente", ["_id", "name"]);
}

importsSchema.plugin(toJSON);
importsSchema.statics.get = async function (id) {
  return await this.findById(id)
}

importsSchema.statics.insert = async function (char) {
  return await this.create(char)
}
export default importsSchema;