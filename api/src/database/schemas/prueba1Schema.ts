import { Schema } from "mongoose";
import { toJSON } from "./plugins";

const prueba1Schema = new Schema({
    /* _id: String, */
    data: { type: Object },
    array: [
        { type: Object },
    ],
});


prueba1Schema.plugin(toJSON);


//-------------------------- SE RECOMIENDA DISCRECIÓN   --------------------------------------------
//-------------------------- SE RECOMIENDA DISCRECIÓN   --------------------------------------------
//-------------------------- SE RECOMIENDA DISCRECIÓN   --------------------------------------------
type PopField = {
    fieldName: string,
    giveMe: Array<string>
}
async function recursividad(fn: Function, arr: Array<PopField>) {
    if (arr.length === 0) return fn();
    const ultimo = arr.pop();
    fn = fn().populate(ultimo.fieldName, ["_id", ...ultimo.giveMe]);
    return await recursividad(fn, arr);
}


prueba1Schema.statics.busquedaPopulada = async function (arr: Array<PopField>) {
    return await recursividad(this.find.bind(this), arr);
};
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

export default prueba1Schema;