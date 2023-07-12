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


export const users= conn.model("users", usersSchema)
export const products= conn.model("products", require("./schemas/productsSchema"))
export const providers= conn.model("providers", require("./schemas/providersSchema"))
export const clients= conn.model("clients", require("./schemas/clientsSchema"))
export const imports= conn.model("imports", require("./schemas/importsSchema"))



//characters.find().populate("films", ["_id", "title"]).then(log);

 