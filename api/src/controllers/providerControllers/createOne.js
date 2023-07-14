import { providers } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
    const { providerName } = req.body
    console.log(providerName)
    const exist = await providers.findOne({name: providerName})
    console.log(exist)
    if (exist) return response(res, 500, 'Ese provedor ya se encuentra registrado')
    const newProvider = new providers({
        name: providerName
    })
    newProvider.save()
    response(res, 200, newProvider)
}