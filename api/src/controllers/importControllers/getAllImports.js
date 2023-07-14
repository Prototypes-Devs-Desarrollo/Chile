import { imports } from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

export default async (req,res) => {
    const allImports = await imports.find();
    if(!allImports) throw new ClientError("No se encontraron importaciones",500)
    response(res,200,allImports)
  };