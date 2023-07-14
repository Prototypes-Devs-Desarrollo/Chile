import { ICliente } from "./IClientes"

export interface IConteiner {
    id: string;
    nombre:string;
    clientes: Array<ICliente>;
}
