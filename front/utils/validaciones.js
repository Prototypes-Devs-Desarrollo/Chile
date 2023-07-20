export const ValidoAddProducto = ({ name, OC, estado_compra, dias_de_entrega, fecha_RDM, fecha_cot, cantidad, peso, CBM, cajas_rollos, FOB, CU_USD_FOB, adelanto_proveedor, cuenta_por_pagar, pago_cliente /* ,import */, client, provider, responsable, estado_producto, estado_entrega, soportes_proveedor, soporte_OC, volumen, swift_pago_recibido }) => {
   const e = {
      valido: true,
   };

   if (name.toString().trim().length === 0) {
      e.name = 'El Nombre esta Vacio';
      e.valido = false;
   }

   // FLATAN MAS VALIDACIONES

   return e;
};

export const ValidoAddOrden = ({ cliente, proveedor, ordenCompra, productos, subTotal, descuentoGlobal, montoNeto, montoExento, iva, total, observacionesGenerales, observacionesPago }) => {
   // cliente: { nombreEmpresa, rut, giro, direccion, email, telefono }
   // proveedor: { nombreEmpresa, rut, direccion, comuna, giro, ciudad, contacto }
   // ordenCompra: { numero, fechaEmision, formaPago, fechaEntrega, moneda, solicitante }
   // productos: []
   const e = {
      valido: true,
   };

   if (cliente.nombreEmpresa.toString().trim().length === 0) {
      e.cliente.nombreEmpresa = 'El Nombre del Cliente esta Vacio';
      e.valido = false;
   }

   // FLATAN MAS VALIDACIONES

   return e;
};
