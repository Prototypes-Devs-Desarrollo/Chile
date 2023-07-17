import { Schema } from "mongoose";
import { prueba1 } from "../database";
import { response } from "../utils";
import { ClientError } from "../utils/errors";


export const flexible = async (req, res) => {
    const {queryConditions, mongooseMethod } = req.body
    if (!queryConditions||!mongooseMethod) throw new ClientError("La has cagado en enviar el body queryConditions:Object, mongooseMethod: string  "+queryConditions+" and "+mongooseMethod, 400)
    const datoFlexible = await prueba1[mongooseMethod](queryConditions)
    if (!datoFlexible) throw new ClientError("No se ha encontrado su petición", 500)
    response(res, 200, datoFlexible)
};


type PopField = {
    fieldName: string,
    giveMe: Array<string>
}

export const XDXD = async (req, res) => {
    if(!Array.isArray(req.body)) throw new ClientError("Debe enviar un array por body [ {fieldName: string,giveMe:['name','_id']} ]",400)
    let resultao
    if(req.body.length==0){
        resultao = await prueba1["busquedaPopulada"]([]); //entre comillas para engañar a typescript.
        
    }else{
        const {fieldName, giveMe } = req.body[0] //solo checkeamos el primero porq si
        if (!fieldName||!giveMe) throw new ClientError("La has cagado en enviar el body fieldName:string, giveMe: Array<string>  ", 400)
        resultao = await prueba1["busquedaPopulada"](req.body); //entre comillas para engañar a typescript.

    }
    
    response(res, 200, resultao)

};
  
export const crear =  async (req, res, next) => {
    if(Object.keys(req.body).length==0) throw new ClientError("Tu body llego vacío",400)  
    //providers: new Schema.Types.ObjectId(providerId),
    const newDocument = new prueba1(req.body);
    await newDocument.save();
    response(res, 201, newDocument);
}

export const editar =  async (req, res, next) => {
    if(Object.keys(req.body).length==0) throw new ClientError("Tu body llego vacío",400)  
    //providers: new Schema.Types.ObjectId(providerId),
    const newDocument = new prueba1(req.body);
    await newDocument.save();
    response(res, 201, newDocument);
}

export const obtenerPorParams = async (req, res) => {
    const { id } = req.params
    const documento = await prueba1.findById(id).maxTimeMS(15000);
    if (!documento) throw new ClientError("No se ha encontrado documento:"+id, 500)
    response(res, 200, documento)
};
  
export const obtenerPorQuery = async (req, res) => {
    if(Object.keys(req.query).length == 0) throw new ClientError("No han llegado tus querys ?key=value&key2=value2",400)
    const documento = await prueba1.findOne(req.query).maxTimeMS(15000);
    if (!documento) throw new ClientError("No se ha encontrado el documento", 500)
    response(res, 200, documento)
};
  

export const borrarPorParams = async (req, res, next) => {
    const { id } = req.params
    const coso = await prueba1.findById(id).maxTimeMS(15000);
    if (!coso) throw new ClientError("No se ha encontrado el producto id:"+id, 500)
    const coso_backup = Object.create(coso)
    await prueba1.deleteOne({ _id: new Schema.Types.ObjectId(id) });
    response(res, 200, coso_backup);
}
export const borrarTodos = async (req, res, next) => {
    await prueba1.deleteMany({})
    response(res, 200, "todo prueba1 borrdo");
}

export const obtenerTodos = async (req, res) => {
  const result = await prueba1.find();
  response(res, 200, result)
};
