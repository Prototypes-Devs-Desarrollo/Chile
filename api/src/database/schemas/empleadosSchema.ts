import  mongoose from 'mongoose'
import validator from 'validator'
import { toJSON /* , paginate */ } from './plugins'
import { ClientError } from '../../utils/errors'

const empleadosSchema = new mongoose.Schema(
  {
    /* _id:String, */
    fullname: String,
    email: String,
    telefono: String,
   	cargo: String,	
    liquidacion	: String,	
    proforma: String,	
    salario: String,	
    imposiciones: String,	
    comisiones: String,	
    salario_USD: String,	
    comisiones_USD: String,	
    comisiones_bancarias_USD: String,	
    horario: String,	
    ficha_hora: String,	
    horas_trabajadas: String,	
    otros: Object //para rellenar con cosas no conempladas
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at', // and `updated_at` to store the last updated date
    },
  }
);

empleadosSchema.plugin(toJSON);
//empleadosSchema.plugin(paginate);

empleadosSchema.statics.list = async function () {
  return await this.find()
}

empleadosSchema.statics.get = async function (id) {
  return await this.findById(id)
}

empleadosSchema.statics.insert = async function (char) {
  return await this.create(char)
}

export default empleadosSchema;
