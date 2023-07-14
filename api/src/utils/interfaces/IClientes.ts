import { IProducto } from "./IProductos";

export interface ICliente {
    id: string;
    nombre: string;
    productos: Array<IProducto>;
}