import { Schema } from "mongoose";
import { imports } from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

export default async (req, res, next) => {
    const { id } = req.body
    const targetImport = await imports.findById(id).maxTimeMS(15000); // Increase timeout to 15 seconds
    const deletedImport = Object.create(targetImport)
    if (!targetImport) throw new ClientError("No se ha encontrado la importación", 400)
    await imports.deleteOne({ _id: new Schema.Types.ObjectId(id) });
    response(res, 200, deletedImport);
}