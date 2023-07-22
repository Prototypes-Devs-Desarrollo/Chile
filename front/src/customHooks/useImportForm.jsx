import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const initial = {
   fechaRDM: '',
   descripcionProducto: '',
   cantidadSolicitada: '',
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
   const setFechaRDM = (fechaRDM) => setInputImp({ ...inputImp, fechaRDM });
   const setDescripcionProducto = (descripcionProducto) => setInputImp({ ...inputImp, descripcionProducto });
   const setCantidadSolicitada = (cantidadSolicitada) => setInputImp({ ...inputImp, cantidadSolicitada });
   const setValor = (valor) => setInputImp({ ...inputImp, valor });
   const setOCNumero = (numero) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, numero } });
   const setOCFechaEmision = (fechaEmision) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, fechaEmision } });
   const setOCFormaPago = (formaPago) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, formaPago } });
   const setOCFechaEntrega = (fechaEntrega) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, fechaEntrega } });
   const setOCMoneda = (moneda) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, moneda } });
   const setOCSolicitante = (solicitante) => setInputImp({ ...inputImp, ordenCompra: { ...inputImp.ordenCompra, solicitante } });
   const setCliId = (id) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, id } });
   const setCliNombreEmpresa = (nombreEmpresa) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, nombreEmpresa } });
   const setCliRut = (rut) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, rut } });
   const setCliGiro = (giro) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, giro } });
   const setCliDireccion = (direccion) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, direccion } });
   const setCliEmail = (email) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, email } });
   const setCliTelefono = (telefono) => setInputImp({ ...inputImp, cliente: { ...inputImp.cliente, telefono } });
   const setProId = (id) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, id } });
   const setProNombreEmpresa = (nombreEmpresa) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, nombreEmpresa } });
   const setProRut = (rut) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, rut } });
   const setProDireccion = (direccion) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, direccion } });
   const setProComuna = (comuna) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, comuna } });
   const setProGiro = (giro) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, giro } });
   const setProCiudad = (ciudad) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, ciudad } });
   const setProContacto = (contacto) => setInputImp({ ...inputImp, proveedor: { ...inputImp.proveedor, contacto } });
   const addEtiqueta = (i) => setInputImp({ ...inputImp, etiquetas: [...inputImp.etiquetas, i] });
   const delEtiqueta = (idEti) => setInputImp({ ...inputImp, etiquetas: inputImp.etiquetas.filter((x) => x.id !== idEti) });
   const setTotalFOB = (totalFOB) => setInputImp({ ...inputImp, totalFOB });
   const setTotalVenta = (totalVenta) => setInputImp({ ...inputImp, totalVenta });
   const setCuentaCliente = (cuentaCliente) => setInputImp({ ...inputImp, cuentaCliente });
   const setCuentaPorPagar = (cuentaPorPagar) => setInputImp({ ...inputImp, cuentaPorPagar });
   const setFechaCOT = (fechaCOT) => setInputImp({ ...inputImp, fechaCOT });
   const setDiasEntregas = (diasEntregas) => setInputImp({ ...inputImp, diasEntregas });
   const setCajasRollos = (cajasRollos) => setInputImp({ ...inputImp, cajasRollos });
   const setKG = (kg) => setInputImp({ ...inputImp, kg });
   const setCBM = (cbm) => setInputImp({ ...inputImp, cbm });
   const setAdelantoProveedor = (adelantoProveedor) => setInputImp({ ...inputImp, adelantoProveedor });
   const setCuVenta = (cuVenta) => setInputImp({ ...inputImp, cuVenta });
   const setAdelantoCliente = (adelantoCliente) => setInputImp({ ...inputImp, adelantoCliente });

   return {
      inputImp,
      setImpInitialInput,
      setImpOC,
      setImpCliente,
      setImpProveedor,
      setFechaRDM,
      setDescripcionProducto,
      setCantidadSolicitada,
      setValor,
      setOCNumero,
      setOCFechaEmision,
      setOCFormaPago,
      setOCFechaEntrega,
      setOCMoneda,
      setOCSolicitante,
      setCliId,
      setCliNombreEmpresa,
      setCliRut,
      setCliGiro,
      setCliDireccion,
      setCliEmail,
      setCliTelefono,
      setProId,
      setProNombreEmpresa,
      setProRut,
      setProDireccion,
      setProComuna,
      setProGiro,
      setProCiudad,
      setProContacto,
      addEtiqueta,
      delEtiqueta,
      setTotalFOB,
      setTotalVenta,
      setCuentaCliente,
      setCuentaPorPagar,
      setFechaCOT,
      setDiasEntregas,
      setCajasRollos,
      setKG,
      setCBM,
      setAdelantoProveedor,
      setCuVenta,
      setAdelantoCliente,
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
