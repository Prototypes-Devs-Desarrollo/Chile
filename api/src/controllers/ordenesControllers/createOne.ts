import { ordenes } from '../../database';
import { response } from '../../utils';
import { ClientError } from '../../utils/errors';
import { NextFunction, Response, Request } from 'express';
import { IOrdenCompraCompleta } from '../../utils/interfaces/IOrdenCompras';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { cliente, proveedor, productos, ordenCompra, descuentoGlobal, iva, montoExento, montoNeto, observacionesGenerales, observacionesPago, subTotal, total }: IOrdenCompraCompleta = req.body;
  const import_sheet = await ordenes.findOne({ 'ordenCompra.numero': ordenCompra.numero });
  if (import_sheet) throw new ClientError(`La Orden de Compra N° ${ordenCompra.numero} ya existe`, 500);
  const newOrden = new ordenes({ cliente, proveedor, productos, ordenCompra, descuentoGlobal, iva, montoExento, montoNeto, observacionesGenerales, observacionesPago, subTotal, total });
  await newOrden.save();
  response(res, 201, newOrden);
};
