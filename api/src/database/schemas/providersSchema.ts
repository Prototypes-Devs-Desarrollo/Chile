import { Schema } from "mongoose";
import { toJSON } from "./plugins";

const providersSchema = new Schema({
  /* _id: String, */
  name: String,
  productos:[{ type: String, ref: "users" }],

});

providersSchema.plugin(toJSON);
// function y no arrow, porque vamos a usar el this.
providersSchema.statics.list = async function () {
  return await this.find()
  .populate("productos", ["_id", "name"])
}

providersSchema.statics.get = async function (id) {
  return await this.findById(id)
}

providersSchema.statics.insert = async function (char) {
  return await this.create(char)
}
export default providersSchema;