import { Schema } from "mongoose";
import { toJSON } from "./plugins";

const importsSchema = new Schema({
  /* _id: String, */
  name: String,
  fecha_RDM: Date,
  fecha_EDC: Date,
  productos: [{ type: String, ref: "products" }],
  responsables:[{ type: String, ref: "users" }],
  clientes:[{ type: String, ref: "clients" }],
});

// function y no arrow, porque vamos a usar el this.
importsSchema.statics.list = async function () {
  return await this.find()
  .populate("productos", ["_id", "name","cantidad","peso","volumen"])
  .populate("clientes", ["_id", "name"])
  .populate("responsables", ["_id", "name"])
}

importsSchema.plugin(toJSON);
importsSchema.statics.get = async function (id) {
  return await this.findById(id)
}

importsSchema.statics.insert = async function (char) {
  return await this.create(char)
}
export default importsSchema;