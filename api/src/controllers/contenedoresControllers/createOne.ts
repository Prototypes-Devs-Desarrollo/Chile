import { response } from '../../utils';
import { ClientError } from '../../utils/errors';
import { Response, Request } from 'express';
import { contenedores, ordenes } from '../../database';
import { IContenedor } from '../../utils/interfaces/IContenedores';

export default async (req: Request, res: Response) => {
  const { fechaRDM, fechaEDC, nombreContenedor, tipo, packageTipo, importaciones }: IContenedor = req.body;

  // Buscar si ya existe un contenedor con las mismas propiedades
  const existingContenedor = await contenedores.findOne({
    fechaRDM,
    fechaEDC,
    nombreContenedor,
    tipo,
    packageTipo,
  });

  if (existingContenedor) {
    // Si el contenedor existe, actualízalo con los nuevos valores
    existingContenedor.importaciones = importaciones;
    await existingContenedor.save();

    response(res, 200, existingContenedor);
  } else {
    // Si el contenedor no existe, crea uno nuevo
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
    }

    response(res, 201, newContenedor);
  }
};