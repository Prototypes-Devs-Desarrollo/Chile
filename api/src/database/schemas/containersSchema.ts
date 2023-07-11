import { Schema } from "mongoose";
import { toJSON } from "./plugins";

const containersSchema = new Schema({
 /*  _id: String, */
  name: String,
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
