import { clients } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
    const { id } = req.query 
    const new_client_data = req.body
    const buscarCondicional = { _id: id };
    const edited_user = await clients.updateOne(buscarCondicional, new_client_data);
 
    response(res,200,edited_user)
  };