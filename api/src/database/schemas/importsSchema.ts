import { Schema } from "mongoose";
import { toJSON } from "./plugins";
const importa = [
  {
    id: 1,
    clientes: [
      {
        id: 1,
        otroddatos: '',
        productoId: [
          {
            id: 1,
            proveedorId: {
              losdatos: 'datos de mierda a agregar'
            },
            responsableId: {
              lodasto: 'datos de mierda a agregar'
            }
          },
          {
            id: 2,
            proveedorId: {
              losdatos: 'datos d emierda'
            },
            responsableId: {
              lodasto: 'datos de mierda a agregar'
            }
          }
        ]
      },
      {
        id: 1,
        otroddatos: '',
        productoId: [
          {
            id: 2,
            proveedorId: {
              losdatos: 'datos d emierda'
            },
            responsableId: {
              lodasto: 'datos de mierda a agregar'
            }
          }
        ]
      }
    ]
  }
]

const impoirtacion = {
  id: 1,
  clientes: [
    {
      id: 1,
      otroddatos: '',
      productoId: [
        {
          id: 1,
          proveedorId: {
            losdatos: 'datos de mierda a agregar'
          },
          responsableId: {
            lodasto: 'datos de mierda a agregar'
          }
        },
        {
          id: 2,
          proveedorId: {
            losdatos: 'datos d emierda'
          },
          responsableId: {
            lodasto: 'datos de mierda a agregar'
          }
        }
      ]
    },
    {
      id: 1,
      otroddatos: '',
      productoId: [
        {
          id: 2,
          proveedorId: {
            losdatos: 'datos d emierda'
          },
          responsableId: {
            lodasto: 'datos de mierda a agregar'
          }
        }
      ]
    }
  ]
}

const importsSchema = new Schema({
  /* _id: String, */
  importDetails:  {type:Object},
  clients: [
    {
      clientId: {type: Schema.Types.ObjectId,ref: "clients"}, //datos-->CONSTANTES/INVARIANTES/permanentes/para siempre.
      clientDetails: {type:Object}, //rellenamos con lo que necesitmos
      products: [
        {
          productId: {type: Schema.Types.ObjectId,ref: "products"}, //datos-->CONSTANTES/INVARIANTES/permanentes/para siempre.
          productDetails: {type:Object}, //rellenamos con lo que necesitmos

          providerId: {type: Schema.Types.ObjectId,ref: "providers"}, //datos-->CONSTANTES/INVARIANTES/permanentes/para siempre.
          providerDetails: {type: Object}, //rellenamos con lo que necesitmos

          responsableId: {type: Schema.Types.ObjectId,ref: "users"}, //datos-->CONSTANTES/INVARIANTES/permanentes/para siempre.
          responsableDetails: {type:Object}, //rellenamos con lo que necesitmos

          destinoId: {type: Schema.Types.ObjectId,ref: "destinos"}, //datos-->CONSTANTES/INVARIANTES/permanentes/para siempre.
          destinoDetails: {type:Object}  //rellenamos con lo que necesitmos
        }
      ]
    }
  ],
});

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