import { Schema } from "mongoose";
import { imports, products } from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";



export default async (req, res, next) => {
    const { providerId, requesterId, product } = req.body
    // const import_sheet = await imports.findById(importId).maxTimeMS(15000); // Increase timeout to 15 seconds
    // if (!import_sheet) throw new ClientError("No se ha encontrado la importación", 400)
    const newProduct = new products({
        product,
        providers: new Schema.Types.ObjectId(providerId),
        responsable: new Schema.Types.ObjectId(requesterId),
    });
    await newProduct.save();
    response(res, 201, newProduct);
}
