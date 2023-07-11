import mongoose from "mongoose"
import  {MONGO_URI} from "../config/env"
import usersSchema from "./schemas/usersSchema";
mongoose.set('strictQuery', true); //ver sies necesario
const conn = mongoose.createConnection(MONGO_URI);


export const users= conn.model("users", usersSchema)
export const products= conn.model("products", require("./schemas/productsSchema"))
export const providers= conn.model("providers", require("./schemas/providersSchema"))
export const clients= conn.model("clients", require("./schemas/clientsSchema"))
export const imports= conn.model("imports", require("./schemas/importsSchema"))



//characters.find().populate("films", ["_id", "title"]).then(log);

 