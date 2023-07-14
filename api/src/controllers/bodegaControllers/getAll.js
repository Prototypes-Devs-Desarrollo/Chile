import { bodegas } from "../../database";
import { response } from "../../utils";

export default async (req,res) => {
    const bodegasDb = await bodegas.find();
    if(!bodegasDb) throw new Error("No se ha encontrado el transporte",500)

    response(res,200,bodegasDb)
  };