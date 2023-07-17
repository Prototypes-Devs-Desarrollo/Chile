import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductoMethod } from '../../utils/metodos/metodosProductos';
import { ValidoAddProducto } from '../../utils/validaciones';
// import validate from './validate';

const initial = {
   name: '',
   OC: '',
   estado_compra: '',
   dias_de_entrega: '',
   fecha_RDM: '',
   fecha_cot: '',
   cantidad: '',
   peso: '',
   CBM: '',
   cajas_rollos: '',
   FOB: '',
   CU_USD_FOB: '',
   adelanto_proveedor: '',
   cuenta_por_pagar: '',
   pago_cliente: '',
   import: [], //seria contenedor en algunos casos //FALTA ESTA EN EL FORM
   client: [], //FALTA ESTA EN EL FORM
   provider: [], //FALTA ESTA EN EL FORM
   responsable: [], //FALTA ESTA EN EL FORM
   estado_producto: '',
   estado_entrega: '',
   soportes_proveedor: '',
   soporte_OC: '',
   volumen: '',
   swift_pago_recibido: '',
};

const validaInitial = {
   valido: true,
};

export const useProductForm = (addHandleOpenPro) => {
   const dispatch = useDispatch();
   const { productosProd, productoProd } = useSelector((state) => state.reducerProduc);
   const [errores, setErrores] = useState(validaInitial);
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const [loading, setLoading] = useState(false);
   const [input, setInput] = useState(initial);

   useEffect(() => {
      return () => {
         if (error) {
            setError('');
         }
      };
   }, [error]);

   useEffect(() => {
      return () => {
         if (success) {
            setSuccess('');
         }
      };
   }, [success]);

   const onChangeAddPro = (e) => {
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      });
      onClickAddPro(e);
   };

   const onClickAddPro = (e) => {
      setErrores(
         ValidoAddProducto({
            ...input,
            [e.target.name]: e.target.value,
         })
      );
   };

   const isButtonDisabled = () => Object.keys(err).length > 0;

   const onSubmitAddPro = async (e) => {
      e.preventDefault();
      if (error) {
         setError('');
      }
      if (success) {
         setSuccess('');
      }

      console.log(input);

      if (errores.valido) {
         await AddProductoMethod({
            pro: input,
            loading: (v) => setLoading(v),
            error: (msg) => setError(msg),
            success: (res) => {
               console.log(res);
               addHandleOpenPro()
            },
         });
      }
      // if (Object.keys(err).length) console.log('error in form'); //esto puede ser modificado por una notificación de error o eliminado
      // const newProduct = {
      //    name: input.name,
      //    OC: input.OC,
      //    estado_compra: input.estado_compra,
      //    dias_de_entrega: input.dias_de_entrega,
      //    fecha_RDM: input.fecha_RDM,
      //    fecha_cot: input.fecha_cot,
      //    cantidad: input.cantidad,
      //    peso: input.peso,
      //    CBM: input.CBM,
      //    cajas_rollos: input.cajas_rollos,
      //    FOB: input.FOB,
      //    CU_USD_FOB: input.CU_USD_FOB,
      //    adelanto_proveedor: input.adelanto_proveedor,
      //    cuenta_por_pagar: input.cuenta_por_pagar,
      //    pago_cliente: input.pago_cliente,
      //    import: [...input.import], //seria contenedor en algunos casos
      //    client: [...input.client],
      //    provider: [...input.provider],
      //    responsable: [...input.responsable],
      //    estado_producto: input.estado_producto,
      //    estado_entrega: input.estado_entrega,
      //    soportes_proveedor: input.soportes_proveedor,
      //    soporte_OC: input.soporte_OC,
      //    volumen: input.volumen,
      //    swift_pago_recibido: input.swift_pago_recibido,
      // };
      // dispatch(createProduct(newProduct));
      // setInput({
      //    name: '',
      //    OC: '',
      //    estado_compra: '',
      //    dias_de_entrega: '',
      //    fecha_RDM: '',
      //    fecha_cot: '',
      //    cantidad: '',
      //    peso: '',
      //    CBM: '',
      //    cajas_rollos: '',
      //    FOB: '',
      //    CU_USD_FOB: '',
      //    adelanto_proveedor: '',
      //    cuenta_por_pagar: '',
      //    pago_cliente: '',
      //    import: [], //seria contenedor en algunos casos
      //    client: [],
      //    provider: [],
      //    responsable: [],
      //    estado_producto: '',
      //    estado_entrega: '',
      //    soportes_proveedor: '',
      //    soporte_OC: '',
      //    volumen: '',
      //    swift_pago_recibido: '',
      // });
   };

   const setName = (name) => setInput({ ...input, name });
   const setOC = (OC) => setInput({ ...input, OC });
   const setEstadoCompra = (estado_compra) => setInput({ ...input, estado_compra });
   const setDiasDeEntrega = (dias_de_entrega) => setInput({ ...input, dias_de_entrega });
   const setFechaRDM = (fecha_RDM) => setInput({ ...input, fecha_RDM });
   const setFechaCot = (fecha_cot) => setInput({ ...input, fecha_cot });
   const setCantidad = (cantidad) => setInput({ ...input, cantidad });
   const setPeso = (peso) => setInput({ ...input, peso });
   const setCBM = (CBM) => setInput({ ...input, CBM });
   const setCajasRollos = (cajas_rollos) => setInput({ ...input, cajas_rollos });
   const setFOB = (FOB) => setInput({ ...input, FOB });
   const setCUUSDFOB = (CU_USD_FOB) => setInput({ ...input, CU_USD_FOB });
   const setAdelantoProveedor = (adelanto_proveedor) => setInput({ ...input, adelanto_proveedor });
   const setCuentaPorPagar = (cuenta_por_pagar) => setInput({ ...input, cuenta_por_pagar });
   const setPagoCliente = (pago_cliente) => setInput({ ...input, pago_cliente });
   //  const setName = (name) => setInput({ ...input, name });
   //  const setName = (name) => setInput({ ...input, name });
   //  const setName = (name) => setInput({ ...input, name });
   //  const setName = (name) => setInput({ ...input, name });
   const setEstadoProducto = (estado_producto) => setInput({ ...input, estado_producto });
   const setEstadoEntrega = (estado_entrega) => setInput({ ...input, estado_entrega });
   const setSoporteProveedor = (soportes_proveedor) => setInput({ ...input, soportes_proveedor });
   const setSoporteOC = (soporte_OC) => setInput({ ...input, soporte_OC });
   const setVolumen = (volumen) => setInput({ ...input, volumen });
   const setSwiftPagoRecibido = (swift_pago_recibido) => setInput({ ...input, swift_pago_recibido });

   return {
      onChangeAddPro,
      onClickAddPro,
      onSubmitAddPro,
      isButtonDisabled,
      input,
      errores,
      error,
      success,
      loading,
      productosProd,
      productoProd,
      setName,
      setOC,
      setEstadoCompra,
      setDiasDeEntrega,
      setFechaRDM,
      setFechaCot,
      setCantidad,
      setPeso,
      setCBM,
      setCajasRollos,
      setFOB,
      setCUUSDFOB,
      setAdelantoProveedor,
      setCuentaPorPagar,
      setPagoCliente,
      setEstadoProducto,
      setEstadoEntrega,
      setSoporteProveedor,
      setSoporteOC,
      setVolumen,
      setSwiftPagoRecibido,
   };
};
