import { ordenes } from "../../database";
import { response } from "../../utils";
import { Request, Response } from "express";

export default async (_req: Request, res: Response) => {
  const ordenes_all = await ordenes.find();
  response(res, 200, ordenes_all)
};