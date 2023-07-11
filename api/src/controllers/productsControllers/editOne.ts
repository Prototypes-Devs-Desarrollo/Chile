import { Schema } from "mongoose";
import { imports, products } from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";



export default async (req, res, next) => {
    const { productId } = req.body
    const producto_a_editar = await imports.findById(productId).maxTimeMS(15000); // Increase timeout to 15 seconds
    if (!producto_a_editar) throw new ClientError("No se ha encontrado la importación", 400)
    products.updateOne({_id: new Schema.Types.ObjectId(productId)},req.body)
    await producto_a_editar.save();
    response(res, 200, producto_a_editar);
}


//TIPADO
type Producto =
    {
        name: String,
        OC: String,
        estado_compra: String,
        dias_de_entrega: Date,
        fecha_RDM: Date,
        fecha_cot: Date,
        cantidad: String,
        peso: String,
        CBM: String,
        cajas_rollos: String,
        FOB: String,
        CU_USD_FOB: String,
        adelanto_proveedor: String,
        cuenta_por_pagar: String,
        pago_cliente: String,
        import: { type: Schema.Types.ObjectId, ref: "imports" }, //seria contenedor en algunos casos
        client: { type: Schema.Types.ObjectId, ref: "clients" },
        provider: { type: Schema.Types.ObjectId, ref: "providers" },
        responsable: { type: Schema.Types.ObjectId, ref: "users" },
        estado_producto: String,
        estado_entrega: String,
        soportes_proveedor: String,
        soporte_OC: String,
        volumen: String,
        swift_pago_recibido: String,
    }