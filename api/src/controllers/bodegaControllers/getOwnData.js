import { bodegas } from "../../database";
import { response } from "../../utils";


export default async (req,res) => {
    const { id } = req.query
    const bodegaDb = await bodegas.findById(id);
    if(!bodegaDb) throw new Error("Transporte no encontrado",500)

    response(res,200,bodegaDb)
  };