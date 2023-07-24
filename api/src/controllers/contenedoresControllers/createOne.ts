import { response } from '../../utils';
import { ClientError } from '../../utils/errors';
import { Response, Request } from 'express';
import { contenedores, ordenes } from '../../database';
import { IContenedor } from '../../utils/interfaces/IContenedores';

export default async (req: Request, res: Response) => {
  const { fechaRDM, fechaEDC, nombreContenedor, tipo, packageTipo, importaciones }: IContenedor = req.body;
  // const import_sheet = await contenedores.findOne({ 'importaciones[0].ordenCompra.numero': importaciones[0].ordenCompra.numero });
  // console.log()
  // if (import_sheet) throw new ClientError(`La Orden de Compra N° ${importaciones[0].ordenCompra.numero} ya esta dentro del Contenedor`, 500);

  const newContenedor = new contenedores({ fechaRDM, fechaEDC, nombreContenedor, tipo, packageTipo, importaciones });
  await newContenedor.save();
  const ord = newContenedor.importaciones.map((x) => x.ordenCompra.numero);
  const set = new Set();
  const arrFiltrado = [];
  for (const item of ord) {
    if (!set.has(item)) {
      set.add(item);
      arrFiltrado.push(item);
    }
  }

  for (const o of arrFiltrado) {
    await ordenes.updateOne({ 'ordenCompra.numero': o }, { importada: true });
    // console.log(updatedImport)
  }

  response(res, 201, newContenedor);
};
