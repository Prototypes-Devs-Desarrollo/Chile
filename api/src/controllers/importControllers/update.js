import { imports } from "../../database";
import { response } from "../../utils";


export default async (req, res) => {
    const {id} = req.query 
    const newData = req.body
    const buscarCondicional = { _id: id };
    const updatedImport = await imports.updateOne(buscarCondicional, newData);
    response(res,200,updatedImport)
  };