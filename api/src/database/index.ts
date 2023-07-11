import mongoose from "mongoose"

import usersSchema from "./schemas/usersSchema"; //1
import productsSchema from "./schemas/productsSchema"; //2
import providersSchema from "./schemas/providersSchema"; //3
import importsSchema from "./schemas/importsSchema"; //4
import clientsSchema from "./schemas/clientsSchema"; //5
import bodegasSchema from "./schemas/bodegasSchema"; //6
import containersSchema from "./schemas/containersSchema";


mongoose.set('strictQuery', true); //ver sies necesario

const deploy = 'mongodb://mongo:2SCyrbD7AwV4tITrjbOA@containers-us-west-186.railway.app:7092'

const conn = mongoose.createConnection(deploy);

export const users = conn.model("users", usersSchema) //1
export const products = conn.model("products", productsSchema) //2
export const providers = conn.model("providers", providersSchema) //3
export const imports = conn.model("imports", importsSchema) //4
export const clients = conn.model("clients", clientsSchema) //5
export const bodegas = conn.model("bodegas", bodegasSchema) //6
export const containers = conn.model("containers", containersSchema) //6




//characters.find().populate("films", ["_id", "title"]).then(log);

