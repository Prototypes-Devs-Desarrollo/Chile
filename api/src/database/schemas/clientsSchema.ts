import { Schema } from 'mongoose';
import { toJSON } from './plugins';
import { ICliente } from '../../utils/interfaces/IClientes';

const clientsSchema = new Schema<ICliente>({
  nombreEmpresa: { type: String },
  rut: { type: String },
  giro: { type: String },
  direccion: { type: String },
  email: { type: String },
  telefono: { type: String },
  id: { type: String },

});

clientsSchema.plugin(toJSON);
// function y no arrow, porque vamos a usar el this.
// clientsSchema.statics.list = async function () {
//   return await this.find();
// };

// clientsSchema.statics.get = async function (id) {
//   return await this.findById(id);
// };

// clientsSchema.statics.insert = async function (char) {
//   return await this.create(char);
// };
export default clientsSchema;
