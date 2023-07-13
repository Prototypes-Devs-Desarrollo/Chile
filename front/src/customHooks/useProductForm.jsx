import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validate from "./validate";
import {
  createProduct,
} from '../../redux/actions/actions';

export const useProductForm = () => {
    const dispatch = useDispatch();
    const [err, setErr] = useState({});
    const [input, setInput] = useState({
      name: "",
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
      import: [], //seria contenedor en algunos casos
      client: [],
      provider: [],
      responsable: [],
      estado_producto: '',
      estado_entrega: '',
      soportes_proveedor: '',
      soporte_OC: '',
      volumen: '',
      swift_pago_recibido: '',
    });
  
    function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErr(validate(input));
    }
  
    const isButtonDisabled = () => Object.keys(err).length > 0;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (Object.keys(err).length)
        console.log('error in form') //esto puede ser modificado por una notificación de error o eliminado
      const newProduct = {
          name: input.name,
          OC: input.OC,
          estado_compra: input.estado_compra,
          dias_de_entrega: input.dias_de_entrega,
          fecha_RDM: input.fecha_RDM,
          fecha_cot: input.fecha_cot,
          cantidad: input.cantidad,
          peso: input.peso,
          CBM: input.CBM,
          cajas_rollos: input.cajas_rollos,
          FOB: input.FOB,
          CU_USD_FOB: input.CU_USD_FOB,
          adelanto_proveedor: input.adelanto_proveedor,
          cuenta_por_pagar: input.cuenta_por_pagar,
          pago_cliente: input.pago_cliente,
          import: [...input.import], //seria contenedor en algunos casos
          client: [...input.client],
          provider: [...input.provider],
          responsable: [...input.responsable],
          estado_producto: input.estado_producto,
          estado_entrega: input.estado_entrega,
          soportes_proveedor: input.soportes_proveedor,
          soporte_OC: input.soporte_OC,
          volumen: input.volumen,
          swift_pago_recibido: input.swift_pago_recibido,
      };
      dispatch(createProduct(newProduct));
      setInput({
          name: "",
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
          import: [], //seria contenedor en algunos casos
          client: [],
          provider: [],
          responsable: [],
          estado_producto: '',
          estado_entrega: '',
          soportes_proveedor: '',
          soporte_OC: '',
          volumen: '',
          swift_pago_recibido: '',
      });
    };
    return {
        handleChange, handleSubmit, isButtonDisabled, input, setInput, err, setErr, dispatch
    }
}