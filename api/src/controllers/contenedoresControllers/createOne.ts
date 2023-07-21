import { response } from '../../utils';
import { ClientError } from '../../utils/errors';
import { Response, Request } from 'express';
import { contenedores } from '../../database';
import { IContenedor } from '../../utils/interfaces/IContenedores';

export default async (req: Request, res: Response) => {
  const { fechaRDM, fechaEDC, nombreContenedor, tipo, importaciones } : IContenedor = req.body
  // const import_sheet = await contenedores.findOne({ 'importaciones[0].ordenCompra.numero': importaciones[0].ordenCompra.numero });
  // console.log()
  // if (import_sheet) throw new ClientError(`La Orden de Compra N° ${importaciones[0].ordenCompra.numero} ya esta dentro del Contenedor`, 500);

  const newContenedor = new contenedores({ fechaRDM, fechaEDC, nombreContenedor, tipo, importaciones });
  await newContenedor.save();
  response(res, 201, newContenedor);
};