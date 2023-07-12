import mongoose from "mongoose";
import { products } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
  const importId: string = req.params
  const objectId = new mongoose.Types.ObjectId(importId);
  const products_by_import = await products.find({ import: objectId });
  response(res, 200, products_by_import)
};
