
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { createClient } from "../../redux/actions/actions"; //no existe ruta para esto a la fecha de creacion del componente

export const useClient = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState({
      name: ""
    });
  
    function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createClient(input)); //guarda con el nombre de esta action!!
      setInput({
        name: ""
      });
    };
  

    return{
        dispatch, input, setInput, handleChange, handleSubmit

    }
}