import { providers } from "../../database";
import { response } from "../../utils";


export default async (req, res) => {
    const { id } = req.body
    const provider = await providers.findOne({id})
    console.log(provider)
    response(res, 200, provider)
}