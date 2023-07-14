import { imports } from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

export default async (req,res) => {
    const { id } = req.body
    const importInDb = await imports.findById(id);
    if(!importInDb) throw new ClientError("No se ha encontrado la importación especificada",500)
    response(res,200,importInDb)
  };