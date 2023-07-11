import mongoose from "mongoose"
import usersSchema from "./schemas/usersSchema";
import productsSchema from "./schemas/productsSchema";
import clientsSchema from "./schemas/clientsSchema";
import importsSchema from "./schemas/importsSchema";
import providersSchema from "./schemas/providersSchema";

mongoose.set('strictQuery', true); //ver sies necesario

const deploy = 'mongodb://mongo:2SCyrbD7AwV4tITrjbOA@containers-us-west-186.railway.app:7092'

const conn = mongoose.createConnection(deploy);

 const users= conn.model("users", usersSchema)
 const products= conn.model("products", productsSchema)
 const providers= conn.model("providers", providersSchema)
 const clients= conn.model("clients", clientsSchema)
 const imports= conn.model("imports", importsSchema)

module.exports = {
    users,
    products,
    providers,
    clients,
    imports
} 

//characters.find().populate("films", ["_id", "title"]).then(log);

 