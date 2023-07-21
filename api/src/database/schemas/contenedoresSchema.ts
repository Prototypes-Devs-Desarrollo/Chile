import { Schema } from 'mongoose';
import { toJSON } from './plugins';
import { IContenedor } from '../../utils/interfaces/IContenedores';
import { IImportacion } from '../../utils/interfaces/IImportaciones';

const contenedoresSchema = new Schema<IContenedor>({
  nombreContenedor: { type: String },
  fechaRDM: { type: String },
  fechaEDC: { type: String },
  tipo: { type: String },
  importaciones: Array<IImportacion>,
});

contenedoresSchema.plugin(toJSON);
// function y no arrow, porque vamos a usar el this.

// containersSchema.statics.list = async function () {
//   return await this.find();
// };

// containersSchema.statics.get = async function (id) {
//   return await this.findById(id);
// };

// containersSchema.statics.insert = async function (char) {
//   return await this.create(char);
// };
export default contenedoresSchema;
