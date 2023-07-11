import mongoose from "mongoose";
import { products } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
  const productId: string = req.params
  const products_by_import = await products.findById(productId);
  response(res, 200, products_by_import)
};
