import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createImport } from "../../redux/actions/actions"; //no existe ruta para esto a la fecha de creacion del componente

export const useImportForm = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
      name: "",
      fecha_RDM: "",
      fecha_EDC: "",
      productos: [],
      responsables: [],
      importType: "",
      packageType: "",
      destino: {
        bodega: "",
        cliente: "",
        otro: {}
      },
      package: {
        container: "",
        otro: {}
      }
    });
  
    function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createImport(input));  //guarda con el nombre de esta action!!
      setInput({
        name: "",
        fecha_RDM: "",
        fecha_EDC: "",
        productos: [],
        responsables: [],
        importType: "",
        packageType: "",
        destino: {
          bodega: "",
          cliente: "",
          otro: {}
        },
        package: {
          container: "",
          otro: {}
        }
      });
    };

    return {
        handleSubmit, handleChange, input, setInput, dispatch
    }
}