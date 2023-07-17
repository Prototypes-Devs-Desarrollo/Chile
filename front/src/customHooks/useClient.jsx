import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { createClient } from '../../redux/actions/actions'; //no existe ruta para esto a la fecha de creacion del componente

const initial = {
   name: '',
};

export const useClient = () => {
   const dispatch = useDispatch();
   const [input, setInput] = useState(initial);

   function handleChange(e) {
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createClient(input)); //guarda con el nombre de esta action!!
      setInput({
         name: '',
      });
   };

   const setName = (name) => setInput({ ...input, name });

   return {
      dispatch,
      input,
      setInput,
      handleChange,
      handleSubmit,
      setName,
   };
};
