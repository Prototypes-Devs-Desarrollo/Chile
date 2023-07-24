import { contenedores } from '../../database';
import { response } from '../../utils';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const contenedores_id = await contenedores.findById({ _id: id });
  response(res, 200, contenedores_id);
};
