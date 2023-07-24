import { clients, ordenes, products, proveedores } from '../../database';
import { response } from '../../utils';
import { ClientError } from '../../utils/errors';
import { Response, Request } from 'express';
import { IOrdenCompraCompleta } from '../../utils/interfaces/IOrdenCompras';

export default async (req: Request, res: Response) => {
  console.log(req.body)
  const { cliente, proveedor, productos, ordenCompra, descuentoGlobal, iva, montoExento, montoNeto, observacionesGenerales, observacionesPago, subTotal, total }: IOrdenCompraCompleta = req.body;
  const import_sheet = await ordenes.findOne({ 'ordenCompra.numero': ordenCompra.numero });
  if (import_sheet) throw new ClientError(`La Orden de Compra N° ${ordenCompra.numero} ya existe`, 500);

  // const existeCliente = await clients.findOne({ rut: cliente.rut });
  // if (!existeCliente) {
  //   const newCliente = new clients(cliente);
  //   await newCliente.save();
  // }

  // const existeProveedor = await proveedores.findOne({ rut: proveedor.rut });
  // if (!existeProveedor) {
  //   const newProveedor = new proveedores(proveedor);
  //   await newProveedor.save();
  // }

  // productos.forEach(async (p) => {
  //   const existeProducto = await products.findOne({ codigo: p.codigo });
  //   if (!existeProducto) {
  //     const newProducto = new products(p);
  //     await newProducto.save();
  //   }
  // });
  const importada = false
  const newOrden = new ordenes({ cliente, proveedor, productos, ordenCompra, descuentoGlobal, iva, montoExento, montoNeto, observacionesGenerales, observacionesPago, importada, subTotal, total });
  await newOrden.save();
  response(res, 201, newOrden);
};
