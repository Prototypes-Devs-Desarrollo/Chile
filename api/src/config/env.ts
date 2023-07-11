require("dotenv").config();

export const MONGO_URI:string = process.env.MONGO_URI
export const JWT_RANDOM_PASSWORD:string = process.env.JWT_RANDOM_PASSWORD
export const PORT = process.env.PORT || '8080';