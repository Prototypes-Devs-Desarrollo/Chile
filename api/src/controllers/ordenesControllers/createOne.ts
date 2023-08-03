import { clients, ordenes, products, proveedores } from '../../database';
import { response } from '../../utils';
import { ClientError } from '../../utils/errors';
import { Response, Request } from 'express';
import { IOrdenCompraCompleta } from '../../utils/interfaces/IOrdenCompras';

export default async (req: Request, res: Response) => {
  const { cliente, proveedor, productos, ordenCompra, descuentoGlobal, iva, montoExento, montoNeto, observacionesGenerales, observacionesPago, subTotal, total } = req.body;
  const importada = false
  
  const newOrden = new ordenes({ cliente, proveedor, productos, ordenCompra, descuentoGlobal, iva, montoExento, montoNeto, observacionesGenerales, observacionesPago, importada, subTotal, total });
  await newOrden.save();
  response(res, 201, newOrden);
};
