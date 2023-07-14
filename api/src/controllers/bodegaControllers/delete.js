import { bodegas } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
    const { id } = req.body;

    const targetBodega = await bodegas.findById(id)
    const deletedBodega = Object.create(targetBodega)
    await bodegas.deleteOne({ _id: id });
    response(res, 201, deletedBodega);
}