import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ValidoAddOrden } from '../../utils/validaciones';
import { AddOrdenMethod, ListOrdenesMethod } from '../../utils/metodos/metodosOrdenes';
import { ordeSetOrdenes } from '@/redux/reducer/reducerOrden';
import { contAddImpContenedor, contDelImpContenedor } from '@/redux/reducer/reducerContenedor';

const initial = {
   cliente: {
      nombreEmpresa: '',
      rut: '',
      giro: '',
      direccion: '',
      email: '',
      telefono: '',
   },
   proveedor: {
      nombreEmpresa: '',
      rut: '',
      direccion: '',
      comuna: '',
      giro: '',
      ciudad: '',
      contacto: '',
   },
   ordenCompra: {
      numero: '',
      fechaEmision: '',
      formaPago: '',
      fechaEntrega: '',
      moneda: '',
      solicitante: '',
   },
   productos: [],
   subTotal: '',
   descuentoGlobal: '',
   montoNeto: '',
   montoExento: '',
   iva: '',
   total: '',
   observacionesGenerales: '',
   observacionesPago: '',
};

const validaInitial = {
   valido: true,
};

export const useOrdenes = (HandleOpenOrd) => {
   const dispatch = useDispatch();
   const { importaciones } = useSelector((state) => state.reducerContenedor.contenedorCont);
   const { ordenesOrde, ordenOrde } = useSelector((state) => state.reducerOrden);
   const [cards, setCards] = useState(true);
   const [errores, setErrores] = useState(validaInitial);
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const [loading, setLoading] = useState(true);
   const [input, setInput] = useState(initial);

   const onUseEffectOrd = async (all) => {
      await ListOrdenesMethod({
         all, // PENDIENTES o AGREGADAS otra cosa las trae todas
         loading: (v) => setLoading(v),
         error: (msg) => setError(msg),
         success: (res) => {
            dispatch(ordeSetOrdenes(res.payload));
         },
      });
   };

   const onChangeAddOrd = (e) => {
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      });
      onClickAddOrd(e);
   };

   const onClickAddOrd = (e) => {
      setErrores(
         ValidoAddOrden({
            ...input,
            [e.target.name]: e.target.value,
         })
      );
   };

   const onSubmitAddOrd = async (e) => {
      e.preventDefault();
      if (error) {
         setError('');
      }
      if (success) {
         setSuccess('');
      }

      // CONSOLE LOG TESTER OBJETO
      console.log(input);

      if (errores.valido) {
         await AddOrdenMethod({
            ord: input,
            loading: (v) => setLoading(v),
            error: (msg) => setError(msg),
            success: async (res) => {
               // CONSOLE LOG TESTER RESPUESTA API
               console.log(res);

               await onUseEffectOrd();
               HandleOpenOrd();
            },
         });
      }
   };

   const onClickSelOrdAddImp = (orden) => {
      if (importaciones.find((i) => i.ordenCompra.numero == orden.ordenCompra.numero)) {
         dispatch(contDelImpContenedor(orden.ordenCompra.numero));
      } else {
         const imp = orden.productos.map((p) => {
            return {
               codigo: p.codigo,
               fechaRDM: '',
               descripcionProducto: p.descripcionProducto,
               cantidadSolicitada: p.cantidadSolicitada,
               precioUnitario: p.precioUnitario,
               valor: p.valor,
               ordenCompra: orden.ordenCompra,
               cliente: orden.cliente,
               proveedor: orden.proveedor,
               etiquetas: [],
               totalFOB: 0,
               totalVenta: 0,
               cuentaCliente: 0,
               cuentaPorPagar: 0,
               fechaCOT: '',
               diasEntregas: 0,
               cajasRollos: 0,
               kg: 0,
               cbm: 0,
               adelantoProveedor: 0,
               cuVenta: 0,
               adelantoCliente: 0,
            };
         });
         dispatch(contAddImpContenedor(imp));
      }
   };

   const onClickCards = () => setCards(!cards);

   const setClienteNombreEmpresa = (nombreEmpresa) => setInput({ ...input, cliente: { ...input.cliente, nombreEmpresa } });
   const setClienteRut = (rut) => setInput({ ...input, cliente: { ...input.cliente, rut } });
   const setClienteGiro = (giro) => setInput({ ...input, cliente: { ...input.cliente, giro } });
   const setClienteDireccion = (direccion) => setInput({ ...input, cliente: { ...input.cliente, direccion } });
   const setClienteEmail = (email) => setInput({ ...input, cliente: { ...input.cliente, email } });
   const setClienteTelefono = (telefono) => setInput({ ...input, cliente: { ...input.cliente, telefono } });
   const setProveedorNombreEmpresa = (nombreEmpresa) => setInput({ ...input, proveedor: { ...input.proveedor, nombreEmpresa } });
   const setProveedorRut = (rut) => setInput({ ...input, proveedor: { ...input.proveedor, rut } });
   const setProveedorDireccion = (direccion) => setInput({ ...input, proveedor: { ...input.proveedor, direccion } });
   const setProveedorComuna = (comuna) => setInput({ ...input, proveedor: { ...input.proveedor, comuna } });
   const setProveedorGiro = (giro) => setInput({ ...input, proveedor: { ...input.proveedor, giro } });
   const setProveedorCiudad = (ciudad) => setInput({ ...input, proveedor: { ...input.proveedor, ciudad } });
   const setProveedorContacto = (contacto) => setInput({ ...input, proveedor: { ...input.proveedor, contacto } });
   const setOrdenCompraNumero = (numero) => setInput({ ...input, ordenCompra: { ...input.ordenCompra, numero } });
   const setOrdenCompraFechaEmision = (fechaEmision) => setInput({ ...input, ordenCompra: { ...input.ordenCompra, fechaEmision } });
   const setOrdenCompraFormaPago = (formaPago) => setInput({ ...input, ordenCompra: { ...input.ordenCompra, formaPago } });
   const setOrdenCompraFechaEntrega = (fechaEntrega) => setInput({ ...input, ordenCompra: { ...input.ordenCompra, fechaEntrega } });
   const setOrdenCompraMoneda = (moneda) => setInput({ ...input, ordenCompra: { ...input.ordenCompra, moneda } });
   const setOrdenCompraSolicitante = (solicitante) => setInput({ ...input, ordenCompra: { ...input.ordenCompra, solicitante } });
   const addProducto = (p) => setInput({ ...input, productos: [...input.productos, p] });
   const delProducto = (idPro) => setInput({ ...input, productos: input.productos.filter((x) => x.id !== idPro) });
   const setSubTotal = (subTotal) => setInput({ ...input, subTotal });
   const setDescuentoGlobal = (descuentoGlobal) => setInput({ ...input, descuentoGlobal });
   const setMontoNeto = (montoNeto) => setInput({ ...input, montoNeto });
   const setMontoExento = (montoExento) => setInput({ ...input, montoExento });
   const setIva = (iva) => setInput({ ...input, iva });
   const setTotal = (total) => setInput({ ...input, total });
   const setObservacionesGenerales = (observacionesGenerales) => setInput({ ...input, observacionesGenerales });
   const setObservacionesPago = (observacionesPago) => setInput({ ...input, observacionesPago });

   return {
      onClickCards,
      onChangeAddOrd,
      onClickAddOrd,
      onSubmitAddOrd,
      onUseEffectOrd,
      cards,
      ordenesOrde,
      ordenOrde,
      errores,
      error,
      success,
      loading,
      setClienteNombreEmpresa,
      setClienteRut,
      setClienteGiro,
      setClienteDireccion,
      setClienteEmail,
      setClienteTelefono,
      setProveedorNombreEmpresa,
      setProveedorRut,
      setProveedorDireccion,
      setProveedorComuna,
      setProveedorGiro,
      setProveedorCiudad,
      setProveedorContacto,
      setOrdenCompraNumero,
      setOrdenCompraFechaEmision,
      setOrdenCompraFormaPago,
      setOrdenCompraFechaEntrega,
      setOrdenCompraMoneda,
      setOrdenCompraSolicitante,
      addProducto,
      delProducto,
      setSubTotal,
      setDescuentoGlobal,
      setMontoNeto,
      setMontoExento,
      setIva,
      setTotal,
      setObservacionesGenerales,
      setObservacionesPago,
      setSuccess,
      setError,
      onClickSelOrdAddImp,
   };
};
