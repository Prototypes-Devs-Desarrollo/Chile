import { products } from "../../database";
import { response } from "../../utils";
import { Response, Request } from "express";
import { IProducto } from "../../utils/interfaces/IProductos";

export default async (req: Request<IProducto>, res: Response) => {
  const { codigo }: IProducto = req.params
  const products_by_import = await products.findOne({ codigo });
  response(res, 200, products_by_import)
};
