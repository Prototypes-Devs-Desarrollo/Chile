import { Schema } from 'mongoose';
import { toJSON } from './plugins';
import { IProducto } from '../../utils/interfaces/IProductos';

const productsSchema = new Schema<IProducto>({
  codigo: { type: String },
  descripcionProducto: { type: String },
  cantidadSolicitada: { type: String },
  precioUnitario: { type: String },
  descuento: { type: String },
  recargo: { type: String },
  aFeX: { type: String },
  valor: { type: String },
  
});

// const productsSchema = new Schema({
//   /* _id: String, */
//   name: String,
//   OC: String,
//   estado_compra: String,
//   dias_de_entrega: Date,
//   fecha_RDM: Date,
//   fecha_cot: Date,
//   cantidad: String,
//   peso: String,
//   CBM: String,
//   cajas_rollos: String,
//   FOB: String,
//   CU_USD_FOB: String,
//   adelanto_proveedor: String,
//   cuenta_por_pagar:String,
//   pago_cliente: String,
//   //import: { type: Schema.Types.ObjectId, ref: "imports" }, //seria contenedor en algunos casos
//   //client: { type: Schema.Types.ObjectId, ref: "clients" },
//   provider: { type: Schema.Types.ObjectId, ref: "providers" }, //PROVEEDOR
//   responsable: { type: Schema.Types.ObjectId, ref: "users" },
//   estado_producto: String,
//   estado_entrega: String,
//   soportes_proveedor: String,
//   soporte_OC: String,
//   volumen: String,
//   swift_pago_recibido: String,
// });

productsSchema.plugin(toJSON);
// function y no arrow, porque vamos a usar el this.
// productsSchema.statics.list = async function () {
//   return await this.find().populate('import', ['_id', 'name']).populate('client', ['_id', 'name']).populate('provider', ['_id', 'name']).populate('responsable', ['_id', 'name']);
// };

// productsSchema.statics.get = async function (id) {
//   return await this.findById(id).populate('homeworld', ['_id', 'name']).populate('films', ['_id', 'title']);
// };

// productsSchema.statics.insert = async function (char) {
//   return await this.create(char);
// };
export default productsSchema;
