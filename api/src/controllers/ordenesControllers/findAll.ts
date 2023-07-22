import { ordenes } from '../../database';
import { response } from '../../utils';
import { Request, Response } from 'express';
import { IOrdQueryGetAll } from '../../utils/interfaces/IOrdenCompras';

export default async (req: Request<null, null, null, IOrdQueryGetAll>, res: Response) => {
  const { all } = req.query;
  if(all === 'AGREGADAS'){
    const ordenes_all = await ordenes.find({ importada: true });
    response(res, 200, ordenes_all);
  } else if (all === 'PENDIENTES'){
    const ordenes_all = await ordenes.find({ importada: false });
    response(res, 200, ordenes_all);
  } else {
    const ordenes_all = await ordenes.find();
    response(res, 200, ordenes_all);
  }
};
