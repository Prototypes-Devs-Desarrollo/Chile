import { contEditImpContenedor } from '@/redux/reducer/reducerContenedor';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const initial = {
   codigo: '',
   fechaRDM: '',
   descripcionProducto: '',
   cantidadSolicitada: '',
   precioUnitario: '',
   valor: '',
   ordenCompra: {
      numero: '',
      fechaEmision: '',
      formaPago: '',
      fechaEntrega: '',
      moneda: '',
      solicitante: '',
   },
   cliente: {
      id: '',
      nombreEmpresa: '',
      rut: '',
      giro: '',
      direccion: '',
      email: '',
      telefono: '',
   },
   proveedor: {
      id: '',
      nombreEmpresa: '',
      rut: '',
      direccion: '',
      comuna: '',
      giro: '',
      ciudad: '',
      contacto: '',
   },
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

export const useImportForm = (imp) => {
   const dispatch = useDispatch();
   // console.log(imp);
   const [inputImp, setInputImp] = useState(imp ? imp : initial);

   const onChangeConImp = (e, idx) => {
      setInputImp({
         ...inputImp,
         [e.target.name]: e.target.value,
      })
      // dispatch(
      //    contEditImpContenedor({
      //       idx,
      //       i: {
      //          ...imp,
      //          [e.target.name]: e.target.value,
      //       },
      //    })
      // );
      // onClickAddCon(e);
   };

   // const onClickAddCon = (e) => {
   //    setErroresCon(
   //       ValidoAddContenedor({
   //          ...contenedorCont,
   //          [e.target.name]: e.target.value,
   //       })
   //    );
   // };

   const setImpInitialInput = () => setInputImp(initial);
   const setImpOC = (ordenCompra) => setInputImp({ ...inputImp, ordenCompra });
   const setImpCliente = (cliente) => setInputImp({ ...inputImp, cliente });
   const setImpProveedor = (proveedor) => setInputImp({ ...inputImp, proveedor });
   const setImpCodigo = (codigo) => setInputImp({ ...inputImp, codigo });
   const setImpFechaRDM = (fechaRDM) => setInputImp({ ...inputImp, fechaRDM });
   const setImpDescripcionProducto = (descripcionProducto) => setInputImp({ ...inputImp, descripcionProducto });
   const setImpCantidadSolicitada = (cantidadSolicitada) => setInputImp({ ...inputImp, cantidadSolicitada });
   const setImpValor = (valor) => setInputImp({ ...inputImp, valor });
   const setImpPrecioUnitario = (precioUnitario) => setInputImp({ ...inputImp, precioUnitario });
   const setImpOCNumero = (numero) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, numero } });
   const setImpOCFechaEmision = (fechaEmision) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, fechaEmision } });
   const setImpOCFormaPago = (formaPago) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, formaPago } });
   const setImpOCFechaEntrega = (fechaEntrega) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, fechaEntrega } });
   const setImpOCMoneda = (moneda) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, moneda } });
   const setImpOCSolicitante = (solicitante) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, solicitante } });
   const setImpCliId = (id) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, id } });
   const setImpCliNombreEmpresa = (nombreEmpresa) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, nombreEmpresa } });
   const setImpCliRut = (rut) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, rut } });
   const setImpCliGiro = (giro) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, giro } });
   const setImpCliDireccion = (direccion) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, direccion } });
   const setImpCliEmail = (email) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, email } });
   const setImpCliTelefono = (telefono) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, telefono } });
   const setImpProId = (id) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, id } });
   const setImpProNombreEmpresa = (nombreEmpresa) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, nombreEmpresa } });
   const setImpProRut = (rut) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, rut } });
   const setImpProDireccion = (direccion) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, direccion } });
   const setImpProComuna = (comuna) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, comuna } });
   const setImpProGiro = (giro) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, giro } });
   const setImpProCiudad = (ciudad) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, ciudad } });
   const setImpProContacto = (contacto) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, contacto } });
   const addImpEtiqueta = (i) => setInputImp({ ...inputImp, etiquetas: [...inputImp.etiquetas, i] });
   const delImpEtiqueta = (idEti) => setInputImp({ ...inputImp, etiquetas: inputImp.etiquetas.filter((x) => x.id !== idEti) });
   const setImpTotalFOB = (totalFOB) => setInputImp({ ...inputImp, totalFOB });
   const setImpTotalVenta = (totalVenta) => setInputImp({ ...inputImp, totalVenta });
   const setImpCuentaCliente = (cuentaCliente) => setInputImp({ ...inputImp, cuentaCliente });
   const setImpCuentaPorPagar = (cuentaPorPagar) => setInputImp({ ...inputImp, cuentaPorPagar });
   const setImpFechaCOT = (fechaCOT) => setInputImp({ ...inputImp, fechaCOT });
   const setImpDiasEntregas = (diasEntregas) => setInputImp({ ...inputImp, diasEntregas });
   const setImpCajasRollos = (cajasRollos) => setInputImp({ ...inputImp, cajasRollos });
   const setImpKG = (kg) => setInputImp({ ...inputImp, kg });
   const setImpCBM = (cbm) => setInputImp({ ...inputImp, cbm });
   const setImpAdelantoProveedor = (adelantoProveedor) => setInputImp({ ...inputImp, adelantoProveedor });
   const setImpCuVenta = (cuVenta) => setInputImp({ ...inputImp, cuVenta });
   const setImpAdelantoCliente = (adelantoCliente) => setInputImp({ ...inputImp, adelantoCliente });

   return {
      onChangeConImp,
      inputImp,
      setImpInitialInput,
      setImpOC,
      setImpCliente,
      setImpProveedor,
      setImpFechaRDM,
      setImpDescripcionProducto,
      setImpCantidadSolicitada,
      setImpValor,
      setImpPrecioUnitario,
      setImpOCNumero,
      setImpOCFechaEmision,
      setImpOCFormaPago,
      setImpOCFechaEntrega,
      setImpOCMoneda,
      setImpOCSolicitante,
      setImpCliId,
      setImpCliNombreEmpresa,
      setImpCliRut,
      setImpCliGiro,
      setImpCliDireccion,
      setImpCliEmail,
      setImpCliTelefono,
      setImpProId,
      setImpProNombreEmpresa,
      setImpProRut,
      setImpProDireccion,
      setImpProComuna,
      setImpProGiro,
      setImpProCiudad,
      setImpProContacto,
      addImpEtiqueta,
      delImpEtiqueta,
      setImpTotalFOB,
      setImpTotalVenta,
      setImpCuentaCliente,
      setImpCuentaPorPagar,
      setImpFechaCOT,
      setImpDiasEntregas,
      setImpCajasRollos,
      setImpKG,
      setImpCBM,
      setImpAdelantoProveedor,
      setImpCuVenta,
      setImpAdelantoCliente,
      setImpCodigo,
   };
};

const ejemplo = {
   codigo: 'A-S2-546839',
   fechaRDM: '',
   descripcionProducto: 'SIKAFLEX 221 CAJA POR 12 CARTUCHOS 300ML Sellador de poliuretano color gris',
   cantidadSolicitada: '240',
   precioUnitario: '7.083,333',
   valor: '1.700.000',
   ordenCompra: {
      numero: '741',
      fechaEmision: '28 de junio de 2023',
      formaPago: 'Cheque',
      fechaEntrega: '03 de julio de 2023',
      moneda: 'Pesos',
      solicitante: 'Ana Sanchez',
   },
   cliente: {
      nombreEmpresa: 'Algo',
      rut: '76.823.233-4',
      giro: '',
      direccion: 'R.5 SUR CHINQUIHUE ALTO KM1029, Puerto Montt',
      email: 'daraya@sasfa.cl',
      telefono: 'Teléfono(s): ',
   },
   proveedor: {
      nombreEmpresa: 'Sika S.A Chile',
      rut: '91.947.000-3',
      direccion: 'Avda. Pdte. Salvador Allende 85, San Joaquin 8941077 Santiago',
      comuna: 'Buin',
      giro: 'Comercializacion',
      ciudad: 'Santiago',
      contacto: '',
   },
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
