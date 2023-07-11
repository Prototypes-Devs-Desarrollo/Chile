import mongoose from "mongoose"
import  {MONGO_URI} from "../config/env"
import usersSchema from "./schemas/usersSchema";
mongoose.set('strictQuery', true); //ver sies necesario
const conn = mongoose.createConnection(MONGO_URI);


 const users= conn.model("users", usersSchema)
 const products= conn.model("products", require("./schemas/productsSchema"))
 const providers= conn.model("providers", require("./schemas/providersSchema"))
 const clients= conn.model("clients", require("./schemas/clientsSchema"))
 const imports= conn.model("imports", require("./schemas/importsSchema"))

module.exports = {
    users,
    products,
    providers,
    clients,
    imports
} 

//characters.find().populate("films", ["_id", "title"]).then(log);

 