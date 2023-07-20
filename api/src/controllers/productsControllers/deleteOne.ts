import { products } from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";
import { Response, Request } from "express";
import { IProducto } from "../../utils/interfaces/IProductos";

export default async (req: Request, res: Response) => {
    const { codigo }: IProducto = req.body
    const product = await products.findOne({ codigo }).maxTimeMS(15000);
    const product_backup = Object.create(product)
    if (!product) throw new ClientError(`El Producto con Codigo "${codigo}" no existe`, 500)
    await products.deleteOne({ codigo });
    response(res, 200, product_backup);
}