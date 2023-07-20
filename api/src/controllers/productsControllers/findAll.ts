import { products } from "../../database";
import { response } from "../../utils";
import { Request, Response } from "express";

export default async (_req: Request, res: Response) => {
  const products_all = await products.find();
  response(res, 200, products_all)
};