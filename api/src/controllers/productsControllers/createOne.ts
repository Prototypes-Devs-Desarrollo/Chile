import { Schema } from 'mongoose';
import { imports, products } from '../../database';
import { response } from '../../utils';
import { ClientError } from '../../utils/errors';
import { Request, Response } from 'express';
import { IProducto } from '../../utils/interfaces/IProductos';

export default async (req: Request, res: Response) => {
  const { aFeX, cantidadSolicitada, codigo, descripcionProducto, descuento, precioUnitario, recargo, valor }: IProducto = req.body;
  const product_sheet = await products.findOne({ codigo }).maxTimeMS(15000);
  if (product_sheet) throw new ClientError(`El Producto con Codigo "${codigo}" ya existe`, 500);
  const newProduct = new products({ aFeX, cantidadSolicitada, codigo, descripcionProducto, descuento, precioUnitario, recargo, valor });
  await newProduct.save();
  response(res, 201, newProduct);
};
