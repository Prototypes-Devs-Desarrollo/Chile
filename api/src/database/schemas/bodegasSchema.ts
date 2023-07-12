import { Schema } from "mongoose";
import { toJSON } from "./plugins";

const bodegasSchema = new Schema({
 /*  _id: String, */
  name: String,
  shippingaddresss: {
    address: { city: String, country: String, line1: String, line2: String, postal_code: String, state: String },
    tracking_number : { type: String },
    name: { type: String },
    phone: { type: String },
  },
});

bodegasSchema.plugin(toJSON);
// function y no arrow, porque vamos a usar el this.
bodegasSchema.statics.list = async function () {
  return await this.find()
}

bodegasSchema.statics.get = async function (id) {
  return await this.findById(id)
}

bodegasSchema.statics.insert = async function (char) {
  return await this.create(char)
}
export default bodegasSchema;
