import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { reducerProviders } from '../redux/reducer/reducerProviders';
import { AddProviderMethod } from '../../utils/metodos/metodosProvider';

const initial = {
  name: ''
};

export const useProvForm = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(initial);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { Provider, Providers } = useSelector((state) => state.reducerProviders);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reducerProviders(input));
    AddProviderMethod({
        pro: input,
        loading: (v) => setLoading(v),
        error: (msg) => setError(msg),
        success: async (res) => console.log(res.payload),
    }) // Asegúrate de tener definida la acción "reducerProviders" en tu archivo reducerProviders.js
    setInput(initial);
  };

  const setName = (name) => setInput({ ...input, name });

  return {
    input,
    handleChange,
    handleSubmit,
    setName,
    loading,
    error,
    Provider,
    Providers,
  };
};






