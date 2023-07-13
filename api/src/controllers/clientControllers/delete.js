import { clients } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
    const clientId = req.params.id;

    const targetClient = await clients.findById(clientId)
    const deletedClient = Object.create(targetClient)
    await clients.deleteOne({ _id: clientId });
    response(res, 201, deletedClient);
}