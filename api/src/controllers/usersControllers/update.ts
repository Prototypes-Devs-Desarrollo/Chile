
import { users } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
    const {id} = req.query 
    const new_user_data = req.body
    const buscarCondicional = { _id: id };
    const edited_user = await users.updateOne(buscarCondicional, new_user_data);
    edited_user["_doc"].password
    response(res,200,edited_user)

  };