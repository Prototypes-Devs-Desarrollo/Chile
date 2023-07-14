import { providers } from "../../database";
import { response } from "../../utils";

export default async(req, res) => {
    const allProviders = await providers.find()
    if(!allProviders) response(res, 400, 'No se han encontrado provedores')
    response(res, 200, allProviders)
}