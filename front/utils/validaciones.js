export const ValidoAddProducto = ({ name, OC, estado_compra, dias_de_entrega, fecha_RDM, fecha_cot, cantidad, peso, CBM, cajas_rollos, FOB, CU_USD_FOB, adelanto_proveedor, cuenta_por_pagar, pago_cliente /* ,import */, client, provider, responsable, estado_producto, estado_entrega, soportes_proveedor, soporte_OC, volumen, swift_pago_recibido }) => {
   const e = {
      valido: true,
   };

   if (name.toString().trim().length === 0) {
      e.name = 'El Nombre esta Vacio';
      e.valido = false;
   }

   return e;
};
