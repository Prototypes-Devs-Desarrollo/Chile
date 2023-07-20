import { providers } from "../../database";
import { response } from "../../utils";


export default async (req, res, next) => {
    const { id } = req.body
    const provider = await providers.findById(id)
    console.log(provider)
    response(res, 200, provider)
}