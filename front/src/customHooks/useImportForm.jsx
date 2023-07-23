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

export const useImportForm = () => {
   const dispatch = useDispatch();
   const [inputImp, setInputImp] = useState(initial);

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
   fechaRDM: 'string',
   descripcionProducto: 'string',
   cantidadSolicitada: 'string',
   valor: 'string',
   ordenCompra: {
      numero: '104',
      fechaEmision: 'string',
      formaPago: 'string',
      fechaEntrega: 'string',
      moneda: 'string',
      solicitante: 'string',
   },
   cliente: {
      id: 'string',
      nombreEmpresa: 'string',
      rut: 'string',
      giro: 'string',
      direccion: 'string',
      email: 'string',
      telefono: 'string',
   },
   proveedor: {
      id: 'string',
      nombreEmpresa: 'string',
      rut: 'string',
      direccion: 'string',
      comuna: 'string',
      giro: 'string',
      ciudad: 'string',
      contacto: 'string',
   },
   etiquetas: [
      {
         id: 'string',
         tipo: 'string',
         color: 'string',
         texto: 'string',
      },
      {
         id: 'string',
         tipo: 'string',
         color: 'string',
         texto: 'string',
      },
      {
         id: 'string',
         tipo: 'string',
         color: 'string',
         texto: 'string',
      },
   ],
   totalFOB: 1,
   totalVenta: 11,
   cuentaCliente: 1,
   cuentaPorPagar: 1,
   fechaCOT: 'string',
   diasEntregas: 1,
   cajasRollos: 1,
   kg: 1,
   cbm: 1,
   adelantoProveedor: 1,
   cuVenta: 1,
   adelantoCliente: 1,
};
