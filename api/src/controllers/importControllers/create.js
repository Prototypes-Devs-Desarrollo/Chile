import { response } from "../../utils";
import { imports } from "../../database";


export default async (req, res, next) => {
  const importData = req.body;
    const newImport = new imports({importData});
    newImport.save()
    response(res, 201, newImport);
  }