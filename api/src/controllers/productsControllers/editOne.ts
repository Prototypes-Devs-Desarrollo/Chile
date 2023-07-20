import { Schema } from 'mongoose';
import { products } from '../../database';
import { response } from '../../utils';
import { ClientError } from '../../utils/errors';
import { Response, Request } from 'express';
import { IProducto } from '../../utils/interfaces/IProductos';

export default async (req: Request<null, null, IProducto>, res: Response) => {
  const { aFeX, cantidadSolicitada, codigo, descripcionProducto, descuento, precioUnitario, recargo, valor }: IProducto = req.body;
  const producto_a_editar = await products.findOne({ codigo }).maxTimeMS(15000);
  if (!producto_a_editar) throw new ClientError(`El Producto con Codigo "${codigo}" no existe`, 500);
  // products.updateOne({_id: new Schema.Types.ObjectId(productId)},req.body)
  products.updateOne({ aFeX, cantidadSolicitada, descripcionProducto, descuento, precioUnitario, recargo, valor, codigo });
  await producto_a_editar.save();
  response(res, 200, producto_a_editar);
};

//TIPADO
// type Producto =
//     {
//         name: String,
//         OC: String,
//         estado_compra: String,
//         dias_de_entrega: Date,
//         fecha_RDM: Date,
//         fecha_cot: Date,
//         cantidad: String,
//         peso: String,
//         CBM: String,
//         cajas_rollos: String,
//         FOB: String,
//         CU_USD_FOB: String,
//         adelanto_proveedor: String,
//         cuenta_por_pagar: String,
//         pago_cliente: String,
//         import: { type: Schema.Types.ObjectId, ref: "imports" }, //seria contenedor en algunos casos
//         client: { type: Schema.Types.ObjectId, ref: "clients" },
//         provider: { type: Schema.Types.ObjectId, ref: "providers" },
//         responsable: { type: Schema.Types.ObjectId, ref: "users" },
//         estado_producto: String,
//         estado_entrega: String,
//         soportes_proveedor: String,
//         soporte_OC: String,
//         volumen: String,
//         swift_pago_recibido: String,
//     }
