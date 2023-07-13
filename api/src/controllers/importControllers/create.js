import { response } from "../../utils";
import { imports } from "../../database";


export default async (req, res, next) => {
  const importData = req.body;
    const importModel = await imports.create(importData);
    response(res, 201, importModel);
  }