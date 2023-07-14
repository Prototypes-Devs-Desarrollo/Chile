import { Schema } from "mongoose";
import { toJSON } from "./plugins";
import { IConteiner } from "../../utils/interfaces/IConteiners";
import { ICliente } from "../../utils/interfaces/IClientes";
import { IProducto } from "../../utils/interfaces/IProductos";

const containersSchema = new Schema<IConteiner>({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  clientes: [{ type: Array<ICliente> }]
});

containersSchema.plugin(toJSON);
// function y no arrow, porque vamos a usar el this.


containersSchema.statics.list = async function () {
  return await this.find()
}

containersSchema.statics.get = async function (id) {
  return await this.findById(id)
}

containersSchema.statics.insert = async function (char) {
  return await this.create(char)
}
export default containersSchema;
