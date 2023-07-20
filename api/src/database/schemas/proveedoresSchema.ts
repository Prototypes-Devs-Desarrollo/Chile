import { Schema } from 'mongoose';
import { toJSON } from './plugins';
import { IProveedor } from '../../utils/interfaces/IProveedores';

const proveedoresSchema = new Schema<IProveedor>({
  nombreEmpresa: { type: String },
  rut: { type: String },
  direccion: { type: String },
  comuna: { type: String },
  giro: { type: String },
  ciudad: { type: String },
  contacto: { type: String },
});

proveedoresSchema.plugin(toJSON);
// function y no arrow, porque vamos a usar el this.
// proveedoresSchema.statics.list = async function () {
//   return await this.find()
//   .populate("productos", ["_id", "name"])
// }

// proveedoresSchema.statics.get = async function (id) {
//   return await this.findById(id)
// }

// proveedoresSchema.statics.insert = async function (char) {
//   return await this.create(char)
// }
export default proveedoresSchema;
