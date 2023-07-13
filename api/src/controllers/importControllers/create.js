import { response } from "../../utils";
import { ClientError } from "../../utils/errors";
import { imports } from "../../database";


export default async (req, res, next) => {
    const importData = req.body;
    const newImport = await imports.create(importData);
    response(res, 201, newImport);
  }