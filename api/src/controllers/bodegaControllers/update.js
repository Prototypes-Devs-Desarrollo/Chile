import { bodegas } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
    const { id } = req.query 
    const new_bodega_data = req.body
    const buscarCondicional = { _id: id };
    const edited_bodegas = await bodegas.updateOne(buscarCondicional, new_bodega_data);
 
    response(res,200,edited_bodegas)
  };