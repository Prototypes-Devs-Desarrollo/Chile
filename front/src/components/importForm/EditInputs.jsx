import { useImportForm } from "@/customHooks/useImportForm";
import React from "react";

export const EditInputs = ({ele}) => {
const {
    codigo,
    fechaRDM,
    descripcionProducto,
    cantidadSolicitada,
    precioUnitario,
    valor,
    ordenCompra,
    cliente,
    proveedor,
    etiquetas,
    totalFOB,
    totalVenta,
    cuentaCliente,
    cuentaPorPagar,
    fechaCOT,
    diasEntregas,
    cajasRollos,
    kg,
    cbm,
    adelantoProveedor,
    cuVenta,
    adelantoCliente,
  } = ele

  const {
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
 }  = useImportForm()
    return(

        <>
        <input value={codigo} onChange={setImpCodigo}/>
        <input fechaRDM={fechaRDM} onChange={setImpFechaRDM}/>


        </>
    )
}