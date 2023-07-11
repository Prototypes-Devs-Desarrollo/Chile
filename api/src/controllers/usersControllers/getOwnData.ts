import database from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

export default async (req,res) => {
    const userInDB = await database.users.findById(req.user.id);
    if(!userInDB) throw new ClientError("Usuario no encontrado",500)
    
    userInDB.password = undefined
    response(res,200,userInDB)
  };