import { contenedores } from "../../database";
import { response } from "../../utils";
import { Request, Response } from "express";

export default async (_req: Request, res: Response) => {
  const contenedores_all = await contenedores.find();
  response(res, 200, contenedores_all)
};