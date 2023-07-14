import { IResponsable } from "./IResponsables";

export interface IProducto {
    id: string;
    nombre: string;
    responsable: IResponsable;
}