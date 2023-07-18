import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { reducerProviders } from '../redux/reducer/reducerProviders';

const initial = {
  name: '',
  productos: [],
};

export const useProvForm = () => {
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
    dispatch(reducerProviders(input)); // Asegúrate de tener definida la acción "reducerProviders" en tu archivo reducerProviders.js
    setInput(initial);
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






