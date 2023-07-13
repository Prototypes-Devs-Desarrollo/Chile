import { clients } from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

export default async (req,res) => {
    const { id } = req.query
    const clientDb = await clients.findById(id);
    if(!clientDb) throw new ClientError("Cliente no encontrado",500)

    response(res,200,clientDb)
  };