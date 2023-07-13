import { clients } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
    const { id } = req.body;

    const targetClient = await clients.findById(id)
    const deletedClient = Object.create(targetClient)
    await clients.deleteOne({ _id: id });
    response(res, 201, deletedClient);
}