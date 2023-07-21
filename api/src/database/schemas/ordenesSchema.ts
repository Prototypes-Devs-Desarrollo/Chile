import { Schema } from 'mongoose';
import { toJSON /* , paginate */ } from './plugins';
import { IProducto } from '../../utils/interfaces/IProductos';
import { IOrdenCompraCompleta } from '../../utils/interfaces/IOrdenCompras';

const ordenesSchema = new Schema<IOrdenCompraCompleta>({
  cliente: { type: Object },
  proveedor: { type: Object },
  ordenCompra: { type: Object },
  productos: Array<IProducto>,
  subTotal: { type: String },
  descuentoGlobal: { type: String },
  montoNeto: { type: String },
  montoExento: { type: String },
  iva: { type: String },
  total: { type: String },
  observacionesGenerales: { type: String },
  observacionesPago: { type: String },
  importada: { type: Boolean },
});

ordenesSchema.plugin(toJSON);
//empleadosSchema.plugin(paginate);

export default ordenesSchema;
