const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/env");
const usersSchema = require("./schemas/usersSchema");

mongoose.set('strictQuery', true); // ver si es necesario

const conn = mongoose.createConnection(MONGO_URI);

const users = conn.model("users", usersSchema);
const products = conn.model("products", require("./schemas/productsSchema"));
const providers = conn.model("providers", require("./schemas/providersSchema"));
const clients = conn.model("clients", require("./schemas/clientsSchema"));
const imports = conn.model("imports", require("./schemas/importsSchema"));

module.exports = { users, products, providers, clients, imports };