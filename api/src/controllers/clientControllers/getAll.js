import { clients } from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

export default async (req,res) => {
    const clientsDb = await clients.find();
    if(!clientsDb) throw new ClientError("No se han encontrado clientes",500)

    response(res,200,clientsDb)
  };