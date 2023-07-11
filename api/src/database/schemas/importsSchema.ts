import { Schema } from "mongoose";
import { toJSON } from "./plugins";

const importsSchema = new Schema({
  /* _id: String, */
  name: String,
  fecha_RDM: Date,
  fecha_EDC: Date,
  productos: [{
    type: Schema.Types.ObjectId,
    ref: "products"
  }],
  responsables: [{
    type: Schema.Types.ObjectId,
    ref: "users"
  }],
  importType: {
    type: String,
    required: true
  },
  packageType: {
    type: String,
    required: true
  },
  destino: {
    bodega: {
      type: Schema.Types.ObjectId,
      ref: "bodegas"
    },
    cliente: {
      type: Schema.Types.ObjectId,
      ref: "clients"
    },
    otro: {
      type: Object
    }
  },
  package: {
    container: {
      type: Schema.Types.ObjectId,
      ref: "containers"
    },

    otro: {
      type: Object
    }
  }



});

// function y no arrow, porque vamos a usar el this.
importsSchema.statics.list = async function () {
  return await this.find()
    .populate("productos", ["_id", "name"])
    .populate("responsables", ["_id", "name"])
    .populate("destino.bodega", ["_id", "name"])
    .populate("destino.cliente", ["_id", "name"]);
}

importsSchema.plugin(toJSON);
importsSchema.statics.get = async function (id) {
  return await this.findById(id)
}

importsSchema.statics.insert = async function (char) {
  return await this.create(char)
}
export default importsSchema;