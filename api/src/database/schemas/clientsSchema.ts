import { Schema } from "mongoose";
import { toJSON } from "./plugins";

const clientsSchema = new Schema({
 /*  _id: String, */
  name: String,
});

clientsSchema.plugin(toJSON);
// function y no arrow, porque vamos a usar el this.
clientsSchema.statics.list = async function () {
  return await this.find()
}

clientsSchema.statics.get = async function (id) {
  return await this.findById(id)
}

clientsSchema.statics.insert = async function (char) {
  return await this.create(char)
}
export default clientsSchema;
