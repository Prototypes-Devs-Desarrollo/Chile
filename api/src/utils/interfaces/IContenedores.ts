import { IImportacion } from "./IImportaciones";

export interface IContenedor {
    id?: string;
    nombreContenedor: string;
    fechaRDM: string;
    fechaEDC: string;
    tipo: string;
    importaciones: Array<IImportacion>;
}
