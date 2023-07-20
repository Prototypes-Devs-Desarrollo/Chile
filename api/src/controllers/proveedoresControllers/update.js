import { providers } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
    const {id} = req.body 
    const new_provider_Data = req.body
    const buscarCondicional = { _id: id };
    const edited_provider = await providers.updateOne(buscarCondicional, new_provider_Data);
    response(res,200,edited_provider)
}