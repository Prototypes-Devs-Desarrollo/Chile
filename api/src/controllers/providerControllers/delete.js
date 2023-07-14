import { providers } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
    const { id } = req.body;

    const targetProvider = await providers.findById(id)
    if (!targetProvider) response(res, 404, 'El proveedor no fue encontrado en la base de datos')
    const deletedProvider = Object.create(targetProvider)
    await providers.deleteOne({ _id: id });
    response(res, 201, `Se eliminó el proveedor ${targetProvider.name} de id ${id}`, {deletedProvider});
}