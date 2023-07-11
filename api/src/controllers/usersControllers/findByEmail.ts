import database from "../../database/";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

export default async (req,res) => {
    const {email} = req.body
    const userInDB = await database.users.findOne({ email: email });
    if(!userInDB) throw new ClientError("Usuario no encontrado",500)
    userInDB.password = undefined
    response(res,200,userInDB)
  };