import { Schema } from "mongoose";
import { products } from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

export default async (req, res, next) => {
    const { id } = req.body
    const product = await products.findById(id).maxTimeMS(15000); // Increase timeout to 15 seconds
    const product_backup = Object.create(product)
    if (!product) throw new ClientError("No se ha encontrado el producto", 400)
    await products.deleteOne({ _id: new Schema.Types.ObjectId(id) });
    response(res, 200, product_backup);
}